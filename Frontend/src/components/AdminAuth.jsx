import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, LockKeyhole, ShieldCheck, UserRound } from "lucide-react";

export default function AdminAuth({ onBack }) {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const title = isSignup ? "Create administrator account" : "Welcome back, administrator";

  function submit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (<main className="auth-page">
    <button className="auth-back" onClick={onBack}><ArrowLeft size={17} /> Back to command centre</button>
    <section className="auth-layout">
      <div className="auth-intro">
        <div className="auth-mark"><ShieldCheck size={26} /></div>
        <p className="eyebrow">Synthetics traffic intelligence</p>
        <h1>Manage every movement with quiet confidence.</h1>
        <p>One clear place for authorised teams to monitor live corridors, predictions, and emergency priorities.</p>
        <div className="auth-stat"><span>99.98%</span><small>Network availability</small></div>
      </div>
      <div className="auth-card">
        <div className="auth-card-heading">
          <p className="eyebrow">Admin portal</p>
          <h2>{title}</h2>
          <p>{isSignup ? "Set up secure access for your operations team." : "Use your approved account to enter the command centre."}</p>
        </div>
        <form onSubmit={submit}>
          {isSignup && <label>Full name<div className="input-wrap"><UserRound size={17}/><input required placeholder="Alex Morgan" /></div></label>}
          <label>Work email<div className="input-wrap"><UserRound size={17}/><input required type="email" placeholder="name@agency.gov" /></div></label>
          <label>Password<div className="input-wrap"><LockKeyhole size={17}/><input required minLength="8" type={showPassword ? "text" : "password"} placeholder="At least 8 characters" /><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label="Show password">{showPassword ? <EyeOff size={17}/> : <Eye size={17}/>}</button></div></label>
          {!isSignup && <div className="form-row"><label className="remember"><input type="checkbox" /> Remember this device</label><button type="button" className="text-button">Forgot password?</button></div>}
          <button className="auth-submit" type="submit">{isSignup ? "Create secure account" : "Sign in to dashboard"}</button>
          {submitted && <p className="form-success">Demo form submitted — connect this form to your authentication API to enable access.</p>}
        </form>
        <p className="auth-switch">{isSignup ? "Already have access?" : "New to the admin portal?"} <button onClick={() => { setIsSignup(!isSignup); setSubmitted(false); }}>{isSignup ? "Sign in" : "Create an account"}</button></p>
      </div>
    </section>
  </main>);
}
