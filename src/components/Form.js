import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert'

export default function Form(props) {
    const errors = props.errors.map((e) => 
        <Alert severity="error">{e}</Alert>
    )

    const handleSubmit = (e) => {
        e.preventDefault()
        props.fetchResults(e.target.elements.email.value)
    }
    
    return(
        <>
            <h3>Check your email address for breached accounts</h3>
            <form onSubmit={(e) => handleSubmit(e)} autoComplete="off">
                <div>
                    {errors}
                </div>
                <TextField name="email" style={{width: 300}} id="filled-basic" label="Email address" variant="filled" />
                <div style={{marginTop: 20}}>
                    <Button type="submit" variant="contained" color="primary">Submit</Button>
                </div>
                
            </form>
        </>
    )
}

