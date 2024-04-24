import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
    const [email, emailUpdate] = useState('')
    const [password, passwordUpdate] = useState('')

    const usenavigate = useNavigate();

    const ProcederLogin = (e) => {
        e.preventDefault();
        let logobj = { email, password };
        if (validate()) {
            //console.log('proceed');
            fetch('http://localhost:5000/sign-in', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(logobj)
            }).then((resp) => {
                if (resp.status === 200) {
                    toast.success('Logowanie powiodło się')
                    usenavigate('/welcomepage')
                } else if (resp.status === 400) {
                    toast.error('Błędny email lub hasło. Spróbuj ponownie');
                } else {
                    toast.error("Wystąpił nieoczekiwany błąd. Spróbuj ponownie póżniej");
                }
            }).catch((err) => {
                toast.error('Logowanie nie powiodło się ' + err.message);
            });
        }
    }
    const validate = () => {
        let result = true;
        if (email === '' || email === null) {
            result = false;
            toast.warning('Proszę wpisać email');
        }

        if (password === '' || password === null) {
            result = false;
            toast.warning('Proszę wpisać hasło');
        }
        return result;

    }

    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={ProcederLogin} style={{ marginTop: '50px' }}>
                    <div className="card">
                        <div className="card-header" style={{ display: 'flex', justifyContent: 'center' }}>
                            <h2>Logowanie</h2>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input value={email} onChange={e => emailUpdate(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Hasło</label>
                                        <input type='password' value={password} onChange={e => passwordUpdate(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <span className="forgot-password">Zapomniałeś hasła? <Link to={'/changepassword'}>Kliknij tutaj</Link></span>
                            </div>

                            <div className="card-footer" style={{ display: 'flex', justifyContent: 'center' }}>
                                <button type="submit" className="btn btn-primary" style={{ marginRight: '10px' }}>Zaloguj się</button>
                                <Link className="btn btn-success" to={'/register'}>Rejestracja</Link>

                            </div>

                        </div>
                    </div>
                </form>

            </div>

        </div>
    )
}

export default LoginPage;