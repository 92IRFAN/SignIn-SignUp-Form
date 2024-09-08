import React, { useState } from 'react';
import { Avatar, Grid, Paper, TextField, Button, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { FormControlLabel, Checkbox, InputAdornment, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';
import { auth } from '../Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

function SignUp() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [key, showkey] = useState(false);

  const handleKey = () => {
    showkey(!key);
  }

  const paperStyle = {
    padding: 20,
    height: 'auto',
    width: 300,
    margin: '45px auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    flexGrow: 1,
  };

  const avatarStyle = {
    backgroundColor: '#4d8af9',
  };

  const btnstyle = {
    margin: "10px 0",
    marginTop: '10px',
    marginBottom: '14px',
    fontWeight: 'bold',
    letterSpacing: '1px'
  };

  const onSubmit = async (data,event) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      toast.success('Account Created Successfully');
      console.log(data);
      reset();
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        toast.error('This email is already in use');
      } else {
        toast.error('Failed to create account. Please try again.');
      }
      console.log('Error =>', err);
    }
  };

  return (
    <Grid container style={{ minHeight: '100vh' }} justifyContent="center" alignItems="center">
      <Paper elevation={10} style={paperStyle}>
        <Grid align='center' margin="10px 0">
          <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
          <h2>Sign Up</h2>
        </Grid>

        <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
          <TextField
            variant="standard"
            label='Username'
            placeholder='Enter your name'
            fullWidth
            required
            {...register('username', { required: true, minLength: 3, maxLength: 12 })}
            error={!!errors.username}
            helperText={errors.username ? (errors.username.type === 'minLength' ? 'Username must be at least 3 characters' : 'Username must be at most 12 characters') : ''}
          />

            <TextField
            variant="standard"
            label='Email'
            placeholder='Enter email'
            fullWidth
            required
            {...register('email', {
                required: 'Email is required',
                pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
                message: 'Enter a valid email address'
                }
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            />

          <TextField
            variant="standard"
            label='Password'
            type={key ? 'text' : 'password'}
            placeholder='Enter password'
            fullWidth
            required
            {...register('password', { required: true, minLength: 6 })}
            error={!!errors.password}
            helperText={errors.password ? (errors.password.type === 'minLength' ? 'Password must be at least 6 characters' : '') : ''}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    {key ? <VisibilityOffIcon onClick={handleKey} /> : <VisibilityIcon onClick={handleKey} />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <FormControlLabel
            control={
              <Checkbox
                name="termsAccepted"
                color="primary"
                {...register('termsAccepted', { required: 'You must accept the terms and conditions' })}
              />
            }
            label="I accept all terms & conditions"
          />
          <Typography color="error" sx={{ fontSize: 12 }}>{errors.termsAccepted?.message}</Typography>

          <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign up</Button>
        </form>

        <Typography sx={{ fontSize: 15, textAlign: 'center', marginTop: 'auto', marginBottom: '12px' }}> Already Registered?
          <Link to="/">
            Sign In
          </Link>
        </Typography>
      </Paper>
    </Grid>
  )
}

export default SignUp;

