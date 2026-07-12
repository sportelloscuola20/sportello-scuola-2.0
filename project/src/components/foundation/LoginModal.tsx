import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Mail, Lock, User, Eye, EyeOff, Loader2, CheckCircle } from 'lucide-react';
import { useAuth } from './AuthContext';
import { supabase } from '../../lib/supabaseClient';
import { sendOnboardingEmail, sendAdminNotification } from '../../lib/emailService';

interface LoginModalProps {
  onClose: () => void;
}

type SignupStatus = 'idle' | 'loading' | 'success' | 'error';

const INPUT_STYLE: Record<string, string> = {
  width: '100%',
  padding: '12px 12px 12px 40px',
  border: '1px solid #D1D5DB',
  borderRadius: 12,
  fontSize: 14,
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s, box-shadow 0.2s',
};

const ICON_STYLE: Record<string, string> = {
  position: 'absolute',
  left: 12,
  top: '50%',
  transform: 'translateY(-50%)',
  color: '#9CA3AF',
};

export default function LoginModal({ onClose }: LoginModalProps) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [ruolo, setRuolo] = useState<'docente' | 'ata' | 'aspirante'>('aspirante');
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<SignupStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstInputRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab' || !modalRef.current) return;
      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
        'input, button, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const isSubmitting = status === 'loading';
  const isSignup = mode === 'signup';

  const handleLogin = async () => {
    const result = await login(email, password);

    if (result.error) {
      setErrorMessage(result.error);
      setStatus('error');
      return;
    }

    try {
      navigate('/area-riservata', { replace: true });
    } catch {
      window.location.href = '/area-riservata';
    }
    onClose();
  };

  const handleSignup = async () => {
    const fullName = `${firstName} ${lastName}`.trim();

    console.log('%c[HACKER MODE] 🚀 Pipeline avviata. Payload di registrazione:', 'color: #00ff00; font-weight: bold;', {
      email,
      password: `PROTECTED_${password.length}_CHARS`,
      name: fullName,
      ruolo,
    });

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, ruolo },
        redirectTo: 'https://sportelloscuola2-0.it/area-riservata',
      },
    });

    if (signUpError) {
      console.error('%c[⚠️ CRITICAL ERROR] Supabase ha rifiutato la richiesta!', 'color: #ff0000; font-weight: bold; font-size: 14px;');
      console.dir(signUpError);
      throw signUpError;
    }

    console.log('%c[✓ SUCCESS] Risposta positiva da Supabase Auth:', 'color: #00ff00; font-weight: bold;', data);

    if (data?.user?.identities?.length === 0) {
      console.warn('%c[⚠️ WARNING] L\'utente esiste già nel database di autenticazione!', 'color: #ffaa00; font-weight: bold;');
    }

    // Invia email di benvenuto al nuovo utente
    sendOnboardingEmail({
      fullName,
      email,
      ruolo,
    }).catch(() => {});

    // Notifica immediata all'admin della nuova registrazione
    if (data?.user?.id) {
      sendAdminNotification({
        uuid: data.user.id,
        fullName,
        email,
        ruolo,
      }).catch(() => {});
    }

    setStatus('success');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const loginTimeout = setTimeout(() => {
      setErrorMessage('Richiesta troppo lunga. Il server non risponde. Verifica la connessione e riprova.');
      setStatus('error');
    }, 25000);

    setStatus('loading');
    try {
      if (mode === 'login') {
        await handleLogin();
      } else {
        await handleSignup();
      }
      clearTimeout(loginTimeout);
    } catch (err) {
      clearTimeout(loginTimeout);
      console.error('%c[❌ PIPELINE BLOCKED]', 'color: #ff0000; font-weight: bold;', err);

      let msg = err instanceof Error ? err.message : "Errore imprevisto.";
      if (!msg || msg === "{}") msg = "Errore di rete o timeout del server Supabase.";

      let userFriendlyMessage = msg;
      if (msg.includes('SMTP') || msg.includes('smtp')) {
        userFriendlyMessage = "Errore Server SMTP. Controlla le credenziali Supabase.";
      } else if (msg.includes('Email provider is disabled')) {
        userFriendlyMessage = "Provider Email disattivato su Supabase.";
      } else if ((err as Record<string, unknown>).name === 'AuthRetryableFetchError') {
        userFriendlyMessage = "Impossibile contattare il server. Controlla la connessione.";
      }

      setErrorMessage(userFriendlyMessage);
      setStatus('error');
    }
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = '#1F915E';
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(31, 145, 94, 0.15)';
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = '#D1D5DB';
    e.currentTarget.style.boxShadow = 'none';
  };

  if (status === 'success') {
    return (
      <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Registrazione completata" style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        width: '100vw', height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999,
      }}>
        <div style={{
          backgroundColor: '#ffffff', borderRadius: 16, width: '100%', maxWidth: 420,
          margin: 16, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          padding: 40, textAlign: 'center',
        }}>
          <div style={{
            width: 72, height: 72, background: 'linear-gradient(135deg, #1F915E, #2F797E)',
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px',
          }}>
            <CheckCircle style={{ width: 36, height: 36, color: '#ffffff' }} />
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#235377', margin: '0 0 12px' }}>
            Registrazione completata!
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: '#4B5563', margin: '0 0 8px' }}>
            Abbiamo inviato un'email di attivazione all'indirizzo<br />
            <strong style={{ color: '#111827' }}>{email}</strong>.
          </p>
          <p style={{ fontSize: 13, color: '#6B7280', margin: '0 0 24px' }}>
            Controlla la tua casella di posta (anche nella cartella Spam) e clicca sul link per attivare il tuo profilo.
          </p>
          <button
            onClick={onClose}
            style={{
              padding: '10px 32px', background: 'linear-gradient(135deg, #235377, #1F915E)',
              color: '#ffffff', border: 'none', borderRadius: 12,
              fontSize: 15, fontWeight: 600, cursor: 'pointer',
            }}
          >
            Ho capito, grazie
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={isSignup ? 'Registrati' : 'Accedi'} ref={modalRef} style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      width: '100vw', height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999,
    }}>
      <div style={{
        backgroundColor: '#ffffff', borderRadius: 16, width: '100%', maxWidth: 420,
        margin: 16, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        position: 'relative', padding: 32,
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: 16, right: 16, color: '#9CA3AF',
          background: 'none', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{
            width: 64, height: 64, background: 'linear-gradient(135deg, #235377, #1F915E)',
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
          }}>
            <User style={{ width: 32, height: 32, color: '#ffffff' }} />
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#235377', margin: 0 }}>
            {isSignup ? 'Registrati' : 'Accedi'}
          </h2>
          <p style={{ color: '#6B7280', fontSize: 14, marginTop: 4 }}>
            {isSignup ? 'Crea il tuo account gratuito' : 'Accedi al tuo account Sportello Scuola 2.0'}
          </p>
        </div>

        {status === 'error' && (
          <div style={{
            marginBottom: 16, padding: 12, backgroundColor: '#FEF2F2',
            border: '1px solid #FECACA', borderRadius: 12, color: '#B91C1C', fontSize: 14,
          }}>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {isSignup && (
            <>
              <div>
                <label htmlFor="login-first-name" style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#374151', marginBottom: 4 }}>
                  Nome
                </label>
                <div style={{ position: 'relative' }}>
                  <User style={ICON_STYLE} size={18} />
                  <input
                    id="login-first-name"
                    ref={firstInputRef}
                    type="text" value={firstName} onChange={e => setFirstName(e.target.value)}
                    placeholder="Mario" required disabled={isSubmitting}
                    style={{ ...INPUT_STYLE, opacity: isSubmitting ? 0.6 : 1 }}
                    onFocus={onFocus} onBlur={onBlur}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="login-last-name" style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#374151', marginBottom: 4 }}>
                  Cognome
                </label>
                <div style={{ position: 'relative' }}>
                  <User style={ICON_STYLE} size={18} />
                  <input
                    id="login-last-name"
                    type="text" value={lastName} onChange={e => setLastName(e.target.value)}
                    placeholder="Rossi" required disabled={isSubmitting}
                    style={{ ...INPUT_STYLE, opacity: isSubmitting ? 0.6 : 1 }}
                    onFocus={onFocus} onBlur={onBlur}
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label htmlFor="login-email" style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#374151', marginBottom: 4 }}>
              Email
            </label>
            <div style={{ position: 'relative' }}>
              <Mail style={ICON_STYLE} size={18} />
              <input
                id="login-email"
                ref={!isSignup ? firstInputRef : undefined}
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="nome@esempio.com" required disabled={isSubmitting}
                style={{ ...INPUT_STYLE, opacity: isSubmitting ? 0.6 : 1 }}
                onFocus={onFocus} onBlur={onBlur}
              />
            </div>
          </div>

          <div>
            <label htmlFor="login-password" style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#374151', marginBottom: 4 }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock style={ICON_STYLE} size={18} />
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={password} onChange={e => setPassword(e.target.value)}
                placeholder="Minimo 6 caratteri" minLength={6} required disabled={isSubmitting}
                style={{
                  ...INPUT_STYLE, padding: '12px 48px 12px 40px',
                  opacity: isSubmitting ? 0.6 : 1,
                }}
                onFocus={onFocus} onBlur={onBlur}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Nascondi password' : 'Mostra password'}
                aria-pressed={showPassword}
                style={{
                position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex',
              }}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {isSignup && (
            <div>
              <label htmlFor="login-ruolo" style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#374151', marginBottom: 4 }}>
                Ruolo
              </label>
              <select
                id="login-ruolo"
                value={ruolo} onChange={e => setRuolo(e.target.value as typeof ruolo)}
                disabled={isSubmitting}
                style={{
                  width: '100%', padding: 12, border: '1px solid #D1D5DB', borderRadius: 12,
                  fontSize: 14, outline: 'none', boxSizing: 'border-box',
                  opacity: isSubmitting ? 0.6 : 1,
                }}
                onFocus={onFocus} onBlur={onBlur}
              >
                <option value="aspirante">Aspirante</option>
                <option value="docente">Docente</option>
                <option value="ata">ATA</option>
              </select>
            </div>
          )}

          <button
            type="submit" disabled={isSubmitting}
            style={{
              width: '100%', padding: '14px 24px',
              background: isSubmitting ? '#9CA3AF' : 'linear-gradient(135deg, #235377, #1F915E)',
              color: '#ffffff', border: 'none', borderRadius: 12,
              fontSize: 16, fontWeight: 700,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              opacity: isSubmitting ? 0.7 : 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: isSubmitting ? 'none' : '0 4px 14px rgba(35, 83, 119, 0.3)',
              transition: 'opacity 0.2s',
            }}
          >
            {isSubmitting && <Loader2 style={{ animation: 'spin 1s linear infinite' }} size={18} />}
            {isSubmitting
              ? 'Elaborazione in corso...'
              : isSignup ? 'Registrati' : 'Accedi'}
          </button>
        </form>

        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <p style={{ fontSize: 14, color: '#6B7280', margin: 0 }}>
            {isSignup ? 'Hai già un account?' : 'Non hai un account?'}
            <button
              onClick={() => { setMode(isSignup ? 'login' : 'signup'); setErrorMessage(''); setStatus('idle'); }}
              style={{
                marginLeft: 4, color: '#1F915E', fontWeight: 600,
                background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, textDecoration: 'underline',
              }}
            >
              {isSignup ? 'Accedi' : 'Registrati'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
