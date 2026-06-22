import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Mail, Lock, User, Eye, EyeOff, Loader2, CheckCircle } from 'lucide-react';
import { useAuth } from './AuthContext';

interface LoginModalProps {
  onClose: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [ruolo, setRuolo] = useState<'docente' | 'ata' | 'aspirante'>('aspirante');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = mode === 'login'
      ? await login(email, password)
      : await signup(email, password, fullName, ruolo);

    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else if (mode === 'signup') {
      setShowSuccess(true);
    } else {
      navigate('/dashboard');
      onClose();
    }
  };

  return (
    <div
      className="modal-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 16,
          width: '100%',
          maxWidth: 420,
          margin: 16,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          position: 'relative',
          padding: 32,
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            color: '#9CA3AF',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 6,
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseOver={e => (e.currentTarget.style.color = '#4B5563')}
          onMouseOut={e => (e.currentTarget.style.color = '#9CA3AF')}
        >
          <X size={20} />
        </button>

        {showSuccess ? (
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: 72,
                height: 72,
                background: 'linear-gradient(135deg, #1F915E, #2F797E)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}
            >
              <CheckCircle style={{ width: 36, height: 36, color: '#ffffff' }} />
            </div>
            <h2
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: '#1F915E',
                margin: '0 0 8px',
              }}
            >
              Registrazione Completata!
            </h2>
            <p style={{ color: '#6B7280', fontSize: 14, lineHeight: '1.6', margin: '0 0 8px' }}>
              Gentile <strong>{fullName}</strong>, la tua registrazione su Sportello Scuola &egrave; avvenuta con successo.
              Hai appena sbloccato l&rsquo;accesso alla piattaforma tecnologica pi&ugrave; avanzata per la gestione
              della tua carriera nel sistema scolastico italiano.
            </p>
            <div
              style={{
                backgroundColor: '#F3F4F6',
                border: '2px dashed #D1D5DB',
                borderRadius: 12,
                padding: 16,
                marginTop: 16,
                textAlign: 'left',
              }}
            >
              <p style={{ fontSize: 13, color: '#374151', margin: '0 0 8px', fontWeight: 600 }}>
                Riepilogo
              </p>
              <p style={{ fontSize: 13, color: '#6B7280', margin: '0 0 4px' }}>
                <strong>Email:</strong> {email}
              </p>
              <p style={{ fontSize: 13, color: '#6B7280', margin: 0 }}>
                <strong>Password:</strong> [La password da te scelta: **********]
              </p>
            </div>
            <p style={{ color: '#9CA3AF', fontSize: 12, marginTop: 16, lineHeight: '1.5' }}>
              Ti abbiamo inviato un&rsquo;email di conferma all&rsquo;indirizzo {email}.
              Verifica la tua casella di posta e clicca sul link di attivazione per completare la procedura.
            </p>
            <button
              onClick={() => { navigate('/dashboard'); onClose(); }}
              style={{
                marginTop: 20,
                width: '100%',
                padding: '14px 24px',
                background: 'linear-gradient(135deg, #1F915E, #235377)',
                color: '#ffffff',
                border: 'none',
                borderRadius: 12,
                fontSize: 16,
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(31, 145, 94, 0.3)',
              }}
            >
              Vai all&rsquo;Area Riservata
            </button>
          </div>
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  background: 'linear-gradient(135deg, #235377, #1F915E)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}
              >
                <User style={{ width: 32, height: 32, color: '#ffffff' }} />
              </div>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: '#235377', margin: 0 }}>
                {mode === 'login' ? 'Accedi' : 'Registrati'}
              </h2>
              <p style={{ color: '#6B7280', fontSize: 14, marginTop: 4 }}>
                {mode === 'login'
                  ? 'Accedi al tuo account Sportello Scuola 2.0'
                  : 'Crea il tuo account gratuito'}
              </p>
            </div>

            {error && (
              <div
                style={{
                  marginBottom: 16,
                  padding: 12,
                  backgroundColor: '#FEF2F2',
                  border: '1px solid #FECACA',
                  borderRadius: 12,
                  color: '#B91C1C',
                  fontSize: 14,
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {mode === 'signup' && (
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 14,
                      fontWeight: 500,
                      color: '#374151',
                      marginBottom: 4,
                    }}
                  >
                    Nome e Cognome
                  </label>
                  <div style={{ position: 'relative' }}>
                    <User
                      style={{
                        position: 'absolute',
                        left: 12,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#9CA3AF',
                      }}
                      size={18}
                    />
                    <input
                      type="text"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      placeholder="Mario Rossi"
                      required
                      style={{
                        width: '100%',
                        padding: '12px 12px 12px 40px',
                        border: '1px solid #D1D5DB',
                        borderRadius: 12,
                        fontSize: 14,
                        outline: 'none',
                        boxSizing: 'border-box',
                        transition: 'border-color 0.2s, box-shadow 0.2s',
                      }}
                      onFocus={e => {
                        e.currentTarget.style.borderColor = '#1F915E';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(31, 145, 94, 0.15)';
                      }}
                      onBlur={e => {
                        e.currentTarget.style.borderColor = '#D1D5DB';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>
              )}

              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: 14,
                    fontWeight: 500,
                    color: '#374151',
                    marginBottom: 4,
                  }}
                >
                  Email
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail
                    style={{
                      position: 'absolute',
                      left: 12,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#9CA3AF',
                    }}
                    size={18}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="nome@esempio.com"
                    required
                    style={{
                      width: '100%',
                      padding: '12px 12px 12px 40px',
                      border: '1px solid #D1D5DB',
                      borderRadius: 12,
                      fontSize: 14,
                      outline: 'none',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.2s, box-shadow 0.2s',
                    }}
                    onFocus={e => {
                      e.currentTarget.style.borderColor = '#1F915E';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(31, 145, 94, 0.15)';
                    }}
                    onBlur={e => {
                      e.currentTarget.style.borderColor = '#D1D5DB';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: 14,
                    fontWeight: 500,
                    color: '#374151',
                    marginBottom: 4,
                  }}
                >
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock
                    style={{
                      position: 'absolute',
                      left: 12,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#9CA3AF',
                    }}
                    size={18}
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Minimo 6 caratteri"
                    minLength={6}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 48px 12px 40px',
                      border: '1px solid #D1D5DB',
                      borderRadius: 12,
                      fontSize: 14,
                      outline: 'none',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.2s, box-shadow 0.2s',
                    }}
                    onFocus={e => {
                      e.currentTarget.style.borderColor = '#1F915E';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(31, 145, 94, 0.15)';
                    }}
                    onBlur={e => {
                      e.currentTarget.style.borderColor = '#D1D5DB';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: 12,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#9CA3AF',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      display: 'flex',
                    }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {mode === 'signup' && (
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 14,
                      fontWeight: 500,
                      color: '#374151',
                      marginBottom: 4,
                    }}
                  >
                    Ruolo
                  </label>
                  <select
                    value={ruolo}
                    onChange={e => setRuolo(e.target.value as typeof ruolo)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #D1D5DB',
                      borderRadius: 12,
                      fontSize: 14,
                      outline: 'none',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.2s, box-shadow 0.2s',
                    }}
                    onFocus={e => {
                      e.currentTarget.style.borderColor = '#1F915E';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(31, 145, 94, 0.15)';
                    }}
                    onBlur={e => {
                      e.currentTarget.style.borderColor = '#D1D5DB';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <option value="aspirante">Aspirante</option>
                    <option value="docente">Docente</option>
                    <option value="ata">ATA</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '14px 24px',
                  background: 'linear-gradient(135deg, #235377, #1F915E)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: 12,
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.5 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  boxShadow: '0 4px 14px rgba(35, 83, 119, 0.3)',
                  transition: 'opacity 0.2s, transform 0.2s',
                }}
                onMouseOver={e => {
                  if (!loading) e.currentTarget.style.opacity = '0.9';
                }}
                onMouseOut={e => {
                  if (!loading) e.currentTarget.style.opacity = '1';
                }}
              >
                {loading && <Loader2 style={{ animation: 'spin 1s linear infinite' }} size={18} />}
                {mode === 'login' ? 'Accedi' : 'Registrati'}
              </button>
            </form>

            <div style={{ marginTop: 24, textAlign: 'center' }}>
              <p style={{ fontSize: 14, color: '#6B7280', margin: 0 }}>
                {mode === 'login' ? 'Non hai un account?' : 'Hai gi\u00e0 un account?'}
                <button
                  onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }}
                  style={{
                    marginLeft: 4,
                    color: '#1F915E',
                    fontWeight: 600,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 14,
                    textDecoration: 'underline',
                  }}
                >
                  {mode === 'login' ? 'Registrati' : 'Accedi'}
                </button>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
