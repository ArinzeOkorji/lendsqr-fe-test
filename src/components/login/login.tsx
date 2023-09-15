import { SyntheticEvent, useRef, useState } from 'react';
import './login.scss';
import { useNavigate } from 'react-router-dom';

export function Login() {
    const [passwordFieldType, setPasswordFieldType] = useState('password');

    const [formData, setState] = useState({
        email: '',
        password: ''
    })

    function togglePasswordField() {
        setPasswordFieldType(passwordFieldType === 'text' ? 'password' : 'text');
    }

    const navigator = useNavigate();

    function login() {
        navigator('/app/users')
    }

    const updateForm = (event: any) => {
        const target = event.currentTarget
    
        setState({
            ...formData,
            [target.name]: target.value
        })
    }

    return <>
        <div className='h-100 d-flex flex-column flex-lg-row login px-5 pb-4 pb-lg-0 px-lg-0 justify-content-lg-between'>
            <div className="d-flex flex-column justify-content-center mt-4 mt-lg-0 position-relative align-items-start logo-header">
                <img src="/src/assets/logo.svg" className='logo mb-5 mb-lg-0' alt="" />
                <div className='img-container align-self-center align-self-lg-start'>
                    <img className='w-100' src="/src/assets/images/login-img.svg" alt="" />
                </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-5 mt-lg-0 flex-grow-lg-1 form-container">

                <div className='flex-fill'>
                    <div className='header-container'>
                        <h2 className='m-0 fw-700 text-color-1 fs-40'>Welcome!</h2>
                        <div className='fs-20 text-color-2'>Enter details to login.</div>
                    </div>
                    <form>
                        <div className="mb-3 input-container">
                            <input type="email" className="form-control" id="email" placeholder="Email" name='email' onChange={updateForm} />
                        </div>
                        <div className="mb-3 input-container">
                            <div className="input-group">
                                <input type={passwordFieldType} className="form-control" id="password" placeholder="Password" name='password' onChange={updateForm} />
                                <span className="d-flex align-items-center justify-content-between text-primary fs-12 bg-white password-trigger" id="basic-addon2" onClick={togglePasswordField}>SHOW</span>
                            </div>
                        </div>

                        <div className='fs-12 fw-600 text-uppercase text-primary forgot-password'>Forgot PASSWORD?</div>

                        <button className='fs-14 fw-600 text-uppercase button-primary w-100' type='button' onClick={login} disabled={!formData.email || !formData.password}>LOG IN</button>
                    </form>
                </div>
            </div>
        </div>
    </>
}