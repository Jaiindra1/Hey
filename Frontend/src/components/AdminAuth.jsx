import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, ShieldCheck, UserRound } from "lucide-react";
import { authApi } from "../api";

export default function AdminAuth({ onAuthenticated }) {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [pending, setPending] = useState(false);
  const title = isSignup ? "Create administrator account" : "Welcome back, administrator";

  async function submit(event) {
    event.preventDefault();
    setFormError("");
    setPending(true);
    try {
      const response = isSignup ? await authApi.signUp({ name, email, password }) : await authApi.signIn({ email, password });
      onAuthenticated(response.user);
    } catch (error) {
      setFormError(error.message);
    } finally { setPending(false); }
  }

  return <main className="auth-page"><section className="auth-layout"><div className="auth-intro"><div className="auth-mark"><ShieldCheck size={26} /></div><p className="eyebrow">Traffic intelligence</p><h1>Manage every movement with quiet confidence.</h1><p>One secure place for authorised teams to monitor corridors, predictions, and emergency priorities.</p><div className="auth-stat"><span>24/7</span><small>Secure operations access</small></div></div><div className="auth-card"><div className="auth-card-heading"><p className="eyebrow">Admin portal</p><h2>{title}</h2><p>{isSignup ? "Register with your name, work email, and a secure password." : "Sign in to enter the command centre."}</p></div><form onSubmit={submit}>{isSignup && <label>Full name<div className="input-wrap"><UserRound size={17}/><input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Alex Morgan" /></div></label>}<label>Work email<div className="input-wrap"><UserRound size={17}/><input required value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="name@agency.gov" /></div></label><label>Password<div className="input-wrap"><LockKeyhole size={17}/><input required value={password} onChange={(event) => setPassword(event.target.value)} minLength="8" type={showPassword ? "text" : "password"} placeholder="At least 8 characters" /><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label="Show password">{showPassword ? <EyeOff size={17}/> : <Eye size={17}/>}</button></div></label><button className="auth-submit mt-6" disabled={pending} type="submit">{pending ? "Please wait…" : isSignup ? "Create secure account" : "Sign in to dashboard"}</button>{formError && <p className="form-success text-error bg-error/10">{formError}</p>}</form><p className="auth-switch">{isSignup ? "Already have access?" : "New to the admin portal?"} <button onClick={() => { setIsSignup(!isSignup); setFormError(""); }}>{isSignup ? "Sign in" : "Create an account"}</button></p></div></section></main>;
}
