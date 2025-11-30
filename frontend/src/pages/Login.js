import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onSuccess, onSwitchToRegister }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ phone: '', password: '', countryCode: '+91' });
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [adminId, setAdminId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value[0];
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newOtp = pastedData.split('');
    while (newOtp.length < 6) newOtp.push('');
    setOtp(newOtp);
    document.getElementById('otp-5')?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
    if (e.key === 'ArrowRight' && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      setAdminId(res.data.adminId);
      setStep(2);
      setTimer(60);
      setCanResend(false);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
    setLoading(false);
  };

  React.useEffect(() => {
    if (step === 2 && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step, timer]);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter complete OTP');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/verify-otp', {
        adminId,
        otp: otpString
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('admin', JSON.stringify(res.data.admin));
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'OTP verification failed');
    }
    setLoading(false);
  };

  const handleResendOtp = async () => {
    if (!canResend) return;
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/resend-otp', { adminId });
      setTimer(60);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 p-4">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400 rounded-full opacity-80"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-white opacity-30 rounded-lg transform rotate-45"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-yellow-300 rounded-full opacity-70"></div>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md relative z-10">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onSwitchToRegister}
            className="px-6 py-2 bg-white border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition"
          >
            Register
          </button>
          <h2 className="text-3xl font-bold text-gray-800">
            {step === 1 ? 'Skip the wait.' : 'Verify OTP'}
          </h2>
        </div>

        {step === 1 ? (
          <>
            <p className="text-blue-600 text-xl font-semibold mb-2">Get your ticket.</p>
            <p className="text-gray-500 text-sm mb-6">Login to your Account</p>

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="text-sm text-gray-600 mb-2 block">Enter your phone number</label>
                <div className="flex gap-2">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="px-3 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+971">🇦🇪 +971</option>
                  </select>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your Number"
                    className="flex-1 px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="text-sm text-gray-600 mb-2 block">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Login'}
              </button>
            </form>
          </>
        ) : (
          <>
            <p className="text-blue-600 text-xl font-semibold mb-2">Get your ticket.</p>
            <p className="text-gray-500 text-sm mb-6">Verify your Account</p>

            <form onSubmit={handleVerifyOtp}>
              <div className="mb-4">
                <label className="text-sm text-gray-600 mb-2 block">Enter OTP</label>
                <div className="flex gap-2 justify-center mb-4">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onPaste={handleOtpPaste}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-14 h-14 text-center text-2xl font-bold border-2 border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ))}
                </div>
                <p className="text-right text-sm text-gray-500">
                  {canResend ? (
                    <button type="button" onClick={handleResendOtp} className="text-blue-600 font-semibold hover:underline">
                      Resend OTP
                    </button>
                  ) : (
                    <span>Resend OTP in <span className="text-blue-600 font-semibold">{timer}s</span></span>
                  )}
                </p>
              </div>

              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
