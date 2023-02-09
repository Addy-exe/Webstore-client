import { Typography, OutlinedInput, InputAdornment, IconButton, InputLabel, Alert, Collapse } from "@mui/material";
import { useState } from "react";
import { makeStyles } from '@mui/styles'
import theme from "../Theme/Theme";
import { useLogin } from "../components/useLogin";
import { Link } from "react-router-dom"
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import logo from '../assets/login.png';


const useStyles = makeStyles({
    Form_container: {
        width: 340,
        height: 440,
        margin: 'auto',
        marginTop: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    header: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        gap: 12
    },
    input_block: {
        display: 'flex',
        flexDirection: 'column',
        width: "80%",
    },
    button: {
        width: '80%',
        height: 30,
        backgroundColor: theme.palette.secondary.main,
        color: 'white',
        border: 'none',
        cursor: 'pointer'
    },
    error: {
        height: 28,
        display: 'flex',
        width: '80%',
        borderRadius: '1rem',
        backgroundColor: '#ed4337',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const Signup = () => {

    const [open,setOpen] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin()
    const [showPassword, setShowPassword] = useState(true)

    const classes = useStyles()

    const handleSubmit = async (e) => {
        if(!error){
            setOpen(false)
        }
        setOpen(true)
        // prevent default refresh
        e.preventDefault()
        await login(email, password)
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleAlert = () => {
      setOpen(!open)
    }

    return (
        <div>
            <form className={classes.Form_container} onSubmit={handleSubmit}>
                <div className={classes.header}>
                    <Typography variant="h3" style={{ fontSize: 24, fontWeight: 'bold' }}>
                        Login please
                    </Typography>
                    <img src={logo} style={{ width: 34, height: 34 }} alt="login-logo" />
                </div>
                <div className={classes.input_block}>
                    <InputLabel htmlFor="outlined-email">Email</InputLabel>
                    <OutlinedInput
                        id="outlined-email"
                        placeholder="Enter your email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        style={{ height: 46 }}
                    />
                </div>
                <div className={classes.input_block}>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        placeholder="Enter your password"
                        type={showPassword ? 'password' : 'text'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ height: 46 }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </div>
                <button
                    disabled={isLoading}
                    variant="contained"
                    type="submit"
                    className={classes.button}
                >Login</button>
                <div className={classes.new_user}>
                    <Typography>
                        New user?
                        <Link to="/signup">
                            Sign up
                        </Link>
                    </Typography>
                </div>
            </form>
            {error &&
                <Collapse in={open}>
                    <Alert
                        severity="error"
                        style={{ width: 340, margin: 'auto' }}
                        onClose={handleAlert}
                    >
                        <strong>{error}</strong>
                    </Alert>
                </Collapse>
            }
        </div>
    )
}

export default Signup