import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';
import './SignUp.css';

const SignUp = () => {
    const [error, setError] = useState('');
    const {createUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        setError('');
        if (password.length < 6) {
            setError("Password must 6 characters or more.");
            return;
        }
        if (password !== confirm) {
            setError('Password did not match.');
            return;
        }
        console.log(email, password, confirm);
        createUser(email,password)
        .then(result=>{
            const user = result.user;
            console.log(user);
            setError('');
            navigate('/');
            form.reset();
        })
        .catch(error=> setError(error));
    }
    return (
        <div className='form-container'>
            <h2 className='form-title'>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' placeholder='email' />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' placeholder='password' />
                </div>
                <div className="form-control">
                    <label htmlFor="confirm">Confirm Password</label>
                    <input type="password" name='confirm' placeholder='password' />
                </div>
                <button className='btn-login'>Sign Up</button>
            </form>
            <p className='new-account'>Already have an account? <Link to='/login'>Login</Link></p>
            <p className='text-error'>{error}</p>
        </div>
    );
};

export default SignUp;