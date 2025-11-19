import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Shield, AlertCircle, CheckCircle2, Info } from "lucide-react";
import Group1 from "../imports/Group26";

interface LoginPageProps {
  onLogin: (role: "centre" | "cluster" | "zonal", userName: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mfaCode, setMfaCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showMfa, setShowMfa] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(0);
  const [showPasswordHint, setShowPasswordHint] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);

  // Mock user database with different roles
  const mockUsers = {
    "centre@nephroplus.com": { password: "Centre@123", role: "centre" as const, name: "Sanjay Kumar", mfa: "123456" },
    "cluster@nephroplus.com": { password: "Cluster@123", role: "cluster" as const, name: "Rahul Sharma", mfa: "123456" },
    "zonal@nephroplus.com": { password: "Zonal@123", role: "zonal" as const, name: "Priya Mehta", mfa: "123456" }
  };

  const validatePassword = (pwd: string) => {
    const hasMinLength = pwd.length >= 8;
    const hasUpperCase = /[A-Z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSpecial = /[!@#$%^&*]/.test(pwd);
    return { hasMinLength, hasUpperCase, hasNumber, hasSpecial };
  };

  const passwordChecks = validatePassword(password);
  const isPasswordValid = Object.values(passwordChecks).every(Boolean);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (lockoutTime > 0) {
      return;
    }

    setError("");
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      // For prototype: just login with a default role based on email pattern or default to centre
      let role: "centre" | "cluster" | "zonal" = "centre";
      let name = "Demo User";
      
      if (email.includes("zonal")) {
        role = "zonal";
        name = "Priya Mehta";
      } else if (email.includes("cluster")) {
        role = "cluster";
        name = "Rahul Sharma";
      } else {
        role = "centre";
        name = "Sanjay Kumar";
      }

      setIsLoading(false);
      onLogin(role, name);
    }, 800);
  };

  const formatLockoutTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-teal-50/20 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-gray-200/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] -z-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="h-[60px] w-[176px]">
              <Group1 />
            </div>
          </div>
          <h1 className="text-gray-900 mb-2">NephroPlus Centre Intelligence</h1>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              {!showMfa && (
                <>
                  <div>
                    <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all outline-none bg-gray-50 hover:bg-white"
                        placeholder="you@nephroplus.com"
                        disabled={lockoutTime > 0}
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label htmlFor="password" className="block text-sm text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setShowPasswordHint(true)}
                        onBlur={() => setTimeout(() => setShowPasswordHint(false), 200)}
                        className="block w-full pl-11 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all outline-none bg-gray-50 hover:bg-white"
                        placeholder="Enter your password"
                        disabled={lockoutTime > 0}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>

                    {/* Password Strength Hint */}
                    {showPasswordHint && password && (
                      <div className="mt-2 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                        <div className="flex items-start gap-2 mb-2">
                          <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-blue-900">Password Requirements:</span>
                        </div>
                        <div className="space-y-1 ml-6">
                          <PasswordRequirement met={passwordChecks.hasMinLength} text="At least 8 characters" />
                          <PasswordRequirement met={passwordChecks.hasUpperCase} text="1 uppercase letter" />
                          <PasswordRequirement met={passwordChecks.hasNumber} text="1 number" />
                          <PasswordRequirement met={passwordChecks.hasSpecial} text="1 special character (!@#$%^&*)" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 text-[#2563EB] border-gray-300 rounded focus:ring-2 focus:ring-[#2563EB] cursor-pointer"
                        disabled={lockoutTime > 0}
                      />
                      <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                        Remember me
                      </span>
                    </label>
                    <button
                      type="button"
                      className="text-sm text-[#2563EB] hover:text-[#1d4ed8] transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                </>
              )}

              {/* MFA Field */}
              {showMfa && (
                <div className="space-y-4">
                  <div className="p-4 bg-teal-50 border border-teal-100 rounded-xl">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-teal-900 mb-1">Two-Factor Authentication</p>
                        <p className="text-xs text-teal-700">
                          Enter the 6-digit code from your authenticator app or SMS
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="mfa" className="block text-sm text-gray-700 mb-2">
                      Authentication Code
                    </label>
                    <input
                      id="mfa"
                      type="text"
                      value={mfaCode}
                      onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all outline-none bg-gray-50 hover:bg-white text-center text-2xl tracking-widest"
                      placeholder="000000"
                      maxLength={6}
                      required
                      autoFocus
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setShowMfa(false);
                      setMfaCode("");
                      setError("");
                    }}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    ← Back to login
                  </button>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-red-900">{error}</p>
                      {lockoutTime > 0 && (
                        <p className="text-xs text-red-700 mt-1">
                          Time remaining: {formatLockoutTime(lockoutTime)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading || lockoutTime > 0 || (showMfa && mfaCode.length !== 6)}
                className="w-full bg-[#2563EB] text-white py-3.5 px-4 rounded-xl hover:bg-[#1d4ed8] transition-all shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none text-center"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Authenticating...
                  </span>
                ) : lockoutTime > 0 ? (
                  `Locked (${formatLockoutTime(lockoutTime)})`
                ) : showMfa ? (
                  "Verify & Login"
                ) : (
                  "Login"
                )}
              </button>

              {/* Security Note */}
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-2">
                <Lock className="w-3.5 h-3.5" />
                <span>Your session is encrypted and monitored</span>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-3 text-xs text-gray-500">
            <button className="hover:text-gray-700 transition-colors">Privacy Policy</button>
            <span className="text-gray-300">•</span>
            <button className="hover:text-gray-700 transition-colors">Terms of Service</button>
            <span className="text-gray-300">•</span>
            <button className="hover:text-gray-700 transition-colors">Help/Support</button>
          </div>
          <p className="text-xs text-gray-400 mt-3" title="Session expires after 30 mins of inactivity">
            OAuth 2.0 Secure Authentication • Session timeout: 30 minutes
          </p>
        </div>
      </div>
    </div>
  );
}

function PasswordRequirement({ met, text }: { met: boolean; text: string }) {
  return (
    <div className="flex items-center gap-2">
      {met ? (
        <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
      ) : (
        <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-300" />
      )}
      <span className={`text-xs ${met ? 'text-green-700' : 'text-gray-600'}`}>
        {text}
      </span>
    </div>
  );
}