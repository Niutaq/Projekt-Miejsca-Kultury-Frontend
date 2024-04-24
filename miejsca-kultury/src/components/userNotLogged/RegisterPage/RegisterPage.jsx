import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterPage = () => {
    const [name, nameChange] = useState('')
    const [surname, surnameChange] = useState('')
    const [email, emailChange] = useState('')
    const [password, passwordChange] = useState('')
    const [repeatPassword, repeatpasswordChange] = useState('')

    const navigate = useNavigate();

    const IsValidate = () => {
        let isproceed = true;
        let errormessage = 'Proszę uzupełnić brakujące dane: ';
        if (name === null || name === '') {
            isproceed = false;
            errormessage += ' Imię';
        }
        if (surname === null || surname === '') {
            isproceed = false;
            errormessage += ' Nazwisko';
        }
        if (email === null || email === '') {
            isproceed = false;
            errormessage += ' Email';
        }
        if (password === null || password === '') {
            isproceed = false;
            errormessage += ' Hasło';
        }
        if (repeatPassword === null || repeatPassword === '') {
            isproceed = false;
            errormessage += ' Powtórz hasło';
        }

        if (!isproceed) {
            toast.warning(errormessage)
        } else {
            if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {

            } else {
                isproceed = false;
                toast.warning('Proszę wpisać poprawny email')
            }
        } 
        if(repeatPassword!== password){
            isproceed = false;
            toast.warning('Hasła nie są podobne')
        }
        return isproceed;
    }

    const handlesubmit = (e) => {
        e.preventDefault();
        let regobj = { name, surname, email, password, repeatPassword };
        if (IsValidate()) {
            //console.log(regobj);
            fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(regobj)
            }).then((res) => {
                toast.success('Rejestracja powiodła się')
                navigate('/login');
            }).catch((err) => {
                toast.error('Rejestracja nie powiodła się' + err.message);
            });
        }
    }

    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handlesubmit} style={{ marginTop: '50px' }}>
                    <div className="card">
                        <div className="card-header" style={{ display: 'flex', justifyContent: 'center' }}>
                            <h2>Rejestracja</h2>
                        </div>
                        <div className="card-body">

                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Imię</label>
                                        <input value={name} onChange={e => nameChange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Nazwisko</label>
                                        <input value={surname} onChange={e => surnameChange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input value={email} onChange={e => emailChange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Hasło</label>
                                        <input type='password' value={password} onChange={e => passwordChange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Powtórz hasło</label>
                                        <input type='password' value={repeatPassword} onChange={e => repeatpasswordChange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="card-footer" style={{ display: 'flex', justifyContent: 'center' }}>
                            <button type="submit" className="btn btn-primary" style={{ marginRight: '10px' }}>Zarejestruj się</button>
                            <Link className="btn btn-success" to={'/login'}>Zaloguj się</Link>
                        </div>
                    </div>
                </form>

            </div>

        </div>
    )
}

export default RegisterPage;