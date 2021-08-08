
import { KeyboardBackspace, KeyboardArrowUp, KeyboardArrowDown, Check } from '@material-ui/icons';
import { 
    Button,
    Container, 
    FormControl, 
    InputLabel, 
    ListItem,
    MenuItem, 
    Select, 
    TextField, Table, TableBody, TableCell, TableHead, TableRow, 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));

function SortCarat(props) {
    
    return (
        <>
            {props.ordered.orderBy === props.th.value ? props.ordered.order === 'asc' ? (
            <KeyboardArrowUp  style={{cursor: 'pointer'}} onClick={() => props.reorder('desc', props.th.value)}></KeyboardArrowUp>
            ) : (
            <KeyboardArrowDown style={{cursor: 'pointer'}} onClick={() => props.reorder('asc', props.th.value)}></KeyboardArrowDown>
            ) : (
            <KeyboardArrowUp style={{cursor: 'pointer', color: '#B8B8B8'}} onClick={() => props.reorder('desc', props.th.value)}></KeyboardArrowUp>
            )} 
        </>
    )
}

export default function Results(props) {
    const classes = useStyles();
    const tableHeaders = [
        {
            name: "Name",
            value: "Name",
            sortable: true,
            searchable: true
        },
        {
            name: "Domain",
            value: "Domain",
            sortable: true,
            searchable: true
        },
        {
            name: "Breach Date",
            value: "BreachDate",
            sortable: true,
            searchable: false
        },
        {
            name: "Description",
            value: "Description",
            sortable: false,
            searchable: true
        },
        {
            name: "Data",
            value: "DataClasses",
            sortable: false,
            searchable: true
        },
        {
            name: "Verified",
            value: "IsVerified",
            sortable: true,
            searchable: false
        },
        {
            name: "Sensitive",
            value: "IsSensitive",
            sortable: true,
            searchable: false
        },
    ]
    return (
        <>
            <Button onClick={() => props.restart()} style={{marginTop: 50}} variant="contained" color="primary"><KeyboardBackspace style={{paddingRight: '10'}}></KeyboardBackspace>Check another account</Button>
            <h2>These accounts have had security breaches:</h2>
            <div>
                <FormControl variant="filled" className={classes.formControl}>
                    <InputLabel id="field-to-search">Field to search</InputLabel>
                    <Select onChange={(e) => props.setSearchType(e.target.value)} labelId="field-to-search" defaultValue="Name">
                        {tableHeaders.filter(th=>th.searchable).map(th =>
                        <MenuItem key={th.value} value={th.value}>{th.name}</MenuItem>)}
                    </Select>
                    <TextField onKeyUp={(e) => props.search(e.target.value)} className={classes.formControl} id="filled-basic" label="Search" variant="filled" />
                </FormControl>
            </div>
            <Container>
                <Table aria-label="breached accounts">
                    <TableHead>
                        <TableRow>
                            <TableCell ></TableCell>
                            {tableHeaders.map(th => 
                                <TableCell key={th.value} align="center">
                                    {th.sortable ? <SortCarat ordered={props.ordered} reorder={props.reorder} th={th}></SortCarat> : <></>}
                                    {th.name}
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.breachedAccounts.map(b => (
                            <TableRow key={b.Title}>
                                <TableCell align="center"> <img width="20" height="20" src={b.LogoPath} alt={`${b.Title} logo`} /></TableCell>
                                <TableCell align="center">
                                {b.Name}
                                </TableCell>
                                <TableCell align="center">{b.Domain}</TableCell>
                                <TableCell align="center">{b.BreachDate}</TableCell>
                                <TableCell dangerouslySetInnerHTML={{ __html: b.Description }}></TableCell>
                                <TableCell>
                                    <ul>
                                        {b.DataClasses.map(d => <ListItem key={d}>{d}</ListItem>)}
                                    </ul>
                                </TableCell>
                                <TableCell align="center">{b.IsVerified ? <Check></Check> : <></>}</TableCell>
                                <TableCell align="center">{b.IsSensitive ? <Check></Check> : <></>}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Container>
        </>
    )
}