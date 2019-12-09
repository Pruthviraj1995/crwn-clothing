import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {auth, createUserProfileDocument} from '../../firebase/firebase-utils';
import './sign-up.styles.scss';
 
class SignUp extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmpassword: ''
        }
    }

    handleSubmit = async e => {
        e.preventDefault();

        const { displayName, email, password, confirmpassword } = this.state;

        if(password !== confirmpassword){
            alert("password don't match");
            return;
        }

        try{
            const { user } = await auth.createUserWithEmailAndPassword(
               email,
               password 
            );

           await createUserProfileDocument(user, { displayName });

           this.setState({
               displayName: '',
               email: '',
               password: '',
               confirmpassword: ''
            });
        }   catch(error) {
            console.log(error);
        }
    };

    handleOnchange = e =>{
        const {name, value} = e.target;
        console.log(name, value);
        this.setState({ [name]: value});
    }

    render(){
        // const [displayName, email , password, confirmpassword] = this.state;
        return(
            <div className='sign-up'>
                <h2 className='title'>I don't have an account</h2>
                <span>Sign Up with your email and password</span>
            <form className='sign-up-form' onSubmit={this.handleSubmit}>
            <FormInput 
                type='text'
                name='displayName'
                value={this.state.displayName}
                label='Display Name'
                OnChange={this.handleOnchange}
                required
            />
            <FormInput 
                type='text'
                name='email'
                value={this.state.email}
                label='Email'
                OnChange={this.handleOnchange}
                required
            />
            <FormInput 
                type='password'
                name='password'
                value={this.state.password}
                label='Password'
                OnChange={this.handleOnchange}
                required
            />
            <FormInput 
                type='confirmpassword'
                name='confirmpassword'
                value={this.state.confirmpassword}
                label='Confirm Password'
                OnChange={this.handleOnchange}
                required
            />
            <div className='buttons'>
                <CustomButton type='submit'>Sign Up</CustomButton>
            </div>
            </form>
            </div>

        )
    }
}

export default SignUp;