import React, { useState } from 'react';
import { Avatar, Grid, Paper, TextField, Button, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { FormControlLabel, Checkbox, InputAdornment, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';
import { auth } from '../Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

function Login() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [key, showkey] = useState(false);

  const handleKey = () => {
    showkey(!key);
  }

  const paperStyle = {
    padding: 20,
    height: 'auto',
    width: 300,
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const avatarStyle = {
    backgroundColor: '#1bbd7e',
  };

  const btnstyle = {
    margin: "10px 0",
    marginTop: '26px',
    marginBottom: '15px',
    fontWeight: 'bold',
    letterSpacing: '1px',
  };

  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success('Login Successfully');
      console.log('Login Successfully');
      reset();
    } catch (error) {
      toast.error('Incorrect email or password');
      console.log('Incorrect email or password');
    }
  };

  return (
    <>
      <Grid container style={{ minHeight: '100vh' }} justifyContent="center" alignItems="center">
        <Paper elevation={10} style={paperStyle}>
          <Grid align='center' margin="10px 0">
            <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
            <h2>Sign In</h2>
          </Grid>

          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
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
                  message: 'Enter a valid email'
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
              {...register('password', { required: 'Password is required' })}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      {key ? <VisibilityOffIcon onClick={handleKey} /> : <VisibilityIcon onClick={handleKey} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }} >
              <FormControlLabel
                control={
                  <Checkbox
                    name="checkedB"
                    color="primary"
                    size='small'
                  />
                }
                label={<span style={{ fontSize: '15px' }}>Remember me</span>}
              />

              <Typography sx={{ fontSize: 15 }}>
                <Link to="#">
                  Forgot password?
                </Link>
              </Typography>
            </Grid>

            <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
          </form>

          <Typography sx={{ fontSize: 15, textAlign: 'center', marginBottom: '14px' }}> Do you have an account?
            <Link to="/SignUp">
              Register
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </>
  );
}

export default Login;
