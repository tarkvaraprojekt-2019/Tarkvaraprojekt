import React from 'react';
import PropTypes from 'prop-types';
import {Link} from '@reach/router';

import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';


import withRoot from '../withRoot';

import Layout from '../components/Layout';


import IncidentTable from "../components/IncidentTable";


const styles = theme => ({
    root: {
        textAlign: 'center',
        paddingTop: theme.spacing.unit * 20,
    },
    paper: {
        margin: theme.spacing.unit * 4,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
            .spacing.unit * 3}px`,
    },
    input: {
        margin: theme.spacing.unit,
    },
});


class newIncident extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    state = {
        victimAge: '',
        victimDisabled: '',
        victimChildren: '',
        victimArea: '',
        name: 'hai',
    };

    render() {
        const {classes} = this.props;

        return (
            <Layout>
                <Typography variant="h4" gutterBottom>
                    Lisa uus juhtum
                </Typography>
                <Paper className={classes.paper}>
                    <form className={classes.form}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="incidentID">Järjekorranumber</InputLabel>
                            <Input defaultValue="1"/>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="victimId">Kliendi kood</InputLabel>
                            <Input defaultValue="123"/>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="incidentDate">Kuupäev</InputLabel>
                            <Input/>
                        </FormControl>
                        <FormControl margin="normal" fullWidth>
                            <InputLabel htmlFor="incidentDesc">Juhtumi Lühikirjeldus</InputLabel>
                            <Input/>
                        </FormControl>
                        <FormControl margin="normal" fullWidth>
                            <InputLabel htmlFor="victimEmail">Suhtluskeel</InputLabel>
                            <Input/>
                        </FormControl>
                        <FormControl margin="normal" fullWidth>
                            <InputLabel htmlFor="victim-age">Vanus</InputLabel>
                            <Select
                                value={this.state.victimAge}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'victimAge',
                                    id: 'victim-age',
                                }}>
                                <MenuItem value={"alla_18"}>Alla 18</MenuItem>
                                <MenuItem value={"18-24"}>18-24</MenuItem>
                                <MenuItem value={"25-49"}>25-49</MenuItem>
                                <MenuItem value={"50-64"}>50-64</MenuItem>
                                <MenuItem value={"65+"}>65+</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl margin="normal" fullWidth>
                            <FormLabel>Puue</FormLabel>
                            <RadioGroup>
                                <FormControlLabel control={
                                    <Radio
                                        checked={this.state.victimDisabled === true}
                                        onChange={() => {
                                            this.setState({victimDisabled: true})}}
                                    />
                                } label="Jah"/>
                                <FormControlLabel control={
                                    <Radio
                                        checked={this.state.victimDisabled === false}
                                        onChange={() => {
                                            this.setState({victimDisabled: false})}}
                                    />
                                } label="Ei"/>
                            </RadioGroup>
                        </FormControl>
                        <FormControl margin="normal" fullWidth>
                            <InputLabel htmlFor="victim-children">Alaealiste laste arv</InputLabel>
                            <Select
                                value={this.state.victimChildren}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'victimChildren',
                                    id: 'victim-children',
                                }}>
                                <MenuItem value={"1"}>1</MenuItem>
                                <MenuItem value={"2"}>2</MenuItem>
                                <MenuItem value={"3"}>3</MenuItem>
                                <MenuItem value={"4"}>4</MenuItem>
                                <MenuItem value={"5"}>5</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl margin="normal" fullWidth>
                            <InputLabel htmlFor="victim-area">Elukoht</InputLabel>
                            <Select
                                value={this.state.victimArea}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'victimArea',
                                    id: 'victim-area',
                                }}
                            >
                                <MenuItem value={"Tartumaa"}>Tartumaa</MenuItem>
                                <MenuItem value={"Harjumaa"}>Harjumaa</MenuItem>
                                <MenuItem value={"Pärnumaa"}>Pärnumaa</MenuItem>
                                <MenuItem value={"Saaremaa"}>Saaremaa</MenuItem>
                                <MenuItem value={"Hiiumaa"}>Hiiumaa</MenuItem>
                                <MenuItem value={"Võrumaa"}>Võrumaa</MenuItem>
                                <MenuItem value={"Ida-Virumaa"}>Ida-Virumaa</MenuItem>
                                <MenuItem value={"Lääne-Virumaa"}>Lääne-Virumaa</MenuItem>
                                <MenuItem value={"Põlvamaa"}>Põlvamaa</MenuItem>
                                <MenuItem value={"Valgamaa"}>Valgamaa</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl margin="normal" fullWidth>
                            <FormLabel>Lähisuhtevägivald</FormLabel>

                        </FormControl>


                    </form>
                </Paper>

                <Paper className={classes.paper}>
                    <Link to="/overview">
                        <Button
                            variant="raised"
                            color="primary"
                        >
                            Salvesta
                        </Button>
                    </Link>
                    <Link to="/overview">

                        <Button
                            variant="raised"
                            color="primary"
                        >
                            Tühista
                        </Button>
                    </Link>
                </Paper>


            </Layout>
        );
    }
}

export default withRoot(withStyles(styles)(newIncident));
