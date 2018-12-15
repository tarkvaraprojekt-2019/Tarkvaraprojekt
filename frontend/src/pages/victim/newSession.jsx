import React from 'react';
import PropTypes from 'prop-types';

import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';


import withRoot from '../../withRoot';

import Layout from '../../components/Layout/index';
import {navigate} from 'gatsby';


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
        minWidth: '600px',

    },
    input: {
        margin: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
    },

    radiob: {
        display: 'flex',
        flexDirection: 'row',
        width: 'auto',
        paddingRight: '3em'
    },
});


class NewSession extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };


    constructor(props) {
        super(props)
        this.axios = this.props.axios

    }

    handleSelectChange = event => {
        const formValues = this.state.formValues
        formValues[event.target.name] = event.target.value
        this.setState({formValues});
        console.log(this.state)
    };
    handleChange = event => {
        const formValues = this.state.formValues
        formValues[event.target.id] = event.target.value
        this.setState({formValues});
    };
    handleNumChange = event => {
        const formValues = this.state.formValues
        formValues[event.target.id] = event.target.value.replace(',', '.')
        this.setState({formValues});
    };

    checkboxChange = field => {
        const formValues = this.state.formValues
        formValues[field] = (formValues[field] === 0 || formValues[field] === "") ? 1 : 0;
        this.setState({formValues});
    };
    radioChange = (field, value) => {
        const formValues = this.state.formValues
        formValues[field] = value
        this.setState({formValues});
    };


    createSession() {
        this.axios.post("create_session.php", this.state.formValues)
            .then(res => {
                let data = res.data;
                console.log("result: ", res)
                navigate('/victim/' + this.props.victimID + '/' + this.props.incidentID + "/" + data);
            })
    }

    static getDate() {
        var local = new Date();
        return local.toJSON().slice(0, 10);
    }

    state = {
        formValues: {
            incident_id: this.props.incidentID,
            kuupaev: NewSession.getDate(),
            kirjeldus: "",
            sidevahendid: 0,
            kriisinoustamine: 0,
            kriisinoustamise_aeg: "",
            juhtuminoustamine: 0,
            vorgustikutoo: 0,
            psuhhonoustamine: 0,
            juuranoustamine: 0,
            tegevused_lapsega: 0,
            tugiteenused: 0,
            naise_majutus: 0,
            laste_arv: 0,
            laste_majutus: 0,
            umarlaud: 0,
            marac: 0,
            perearst_kaasatud: 0,
            emo_kaasatud: 0,
            naistearst_kaasatud: 0,
            politsei_kaasatud: 0,
            prokuratuur_kaasatud: 0,
            ohvriabi_kaasatud: 0,
            lastekaitse_kaasatud: 0,
            kov_kaasatud: 0,
            tsiviilkohus_kaasatud: 0,
            kriminaalkohus_kaasatud: 0,
            haridusasutus_kaasatud: 0,
            mtu_kaasatud: 0,
            tuttavad_kaasatud: 0,
            markused: ""
        },
    };

    handleSubmit = event => {
        event.preventDefault()
        this.createSession()
    }

    render() {
        const textfield = (id, label, value, pattern) => (

            <TextField
                label={label}
                className={classes.input}
                value={value}
                onChange={this.handleNumChange}
                id={id}
                inputProps={{pattern: pattern}}
            />
        )

        const checkbox = (id, statename, label) => (
            <FormControlLabel control={
                <Checkbox
                    checked={statename === 1}
                    onClick={() => {
                        this.checkboxChange(id)
                    }}
                />
            } label={label}/>
        )
        const {classes} = this.props;
        return <Layout title="Uus sessioon">
            <Typography variant="h4" gutterBottom>
                Lisa uus sessioon
            </Typography>
            <Paper className={classes.paper}>
                <Grid container
                      direction="column"
                      justify="center"
                      alignItems="center"
                      spacing={8}>
                    <Grid item>
                        <form className={classes.form} onSubmit={this.handleSubmit}>
                            <Grid container
                                  direction="row"
                                  justify="center"
                                  spacing={16}>
                                <Grid item sm={3}>
                                    <FormControl margin="normal" fullwidth>
                                        <TextField
                                            value={this.state.formValues.kuupaev}
                                            id="kuupaev"
                                            label="Kuupäev"
                                            type="date"
                                            onChange={this.handleChange}

                                        />
                                    </FormControl>
                                    <br/>
                                    <FormControl margin="normal" fullwidth>
                                        <TextField
                                            label="Kirjeldus"
                                            multiline
                                            rowsMax="3"
                                            value={this.state.formValues.kirjeldus}
                                            onChange={this.handleChange}
                                            id="kirjeldus"
                                        />
                                    </FormControl>
                                    <br/>
                                    <FormControl margin="normal" fullwidth>
                                        <TextField
                                            label="Märkused"
                                            multiline
                                            rowsMax="3"
                                            value={this.state.formValues.markused}
                                            onChange={this.handleChange}
                                            id="markused"
                                        />
                                    </FormControl>
                                    <FormControl margin="normal" fullWidth>
                                        <FormLabel>Kas nõustamine toimus sidevahendite abil?</FormLabel>
                                        <RadioGroup className={classes.radiob}>
                                            <FormControlLabel control={
                                                <Radio
                                                    checked={this.state.formValues.sidevahendid === 1}
                                                    onClick={() => this.radioChange("sidevahendid", 1)}/>
                                            } label="Jah"/>
                                            <FormControlLabel control={
                                                <Radio
                                                    checked={this.state.formValues.sidevahendid === 0}
                                                    onClick={() => this.radioChange("sidevahendid", 0)}/>
                                            } label="Ei"/>
                                        </RadioGroup>
                                    </FormControl>

                                </Grid>

                                <Grid item sm={5}>
                                    <FormControl margin="normal" fullWidth>
                                        <FormLabel>Osutatud teenused (tundide arv)</FormLabel>
                                    </FormControl>
                                    {textfield("kriisinoustamine", "Kriisinõustamine", this.state.formValues.kriisinoustamine, "\\d*|(\\d+([.,](00?|25|50?|75))?)")}
                                     <FormControl>
                                            <div
                                                className={classes.input}
                                            >
                                                <InputLabel htmlFor="kriisinoustamise_aeg">Kriisinõus. aeg</InputLabel>
                                                <Select
                                                    value={this.state.formValues.kriisinoustamise_aeg  === "" ? "Puudub" : this.state.formValues.kriisinoustamise_aeg}
                                                    onChange={this.handleSelectChange}
                                                    inputProps={{
                                                        name: 'kriisinoustamise_aeg',
                                                        id: 'kriisinoustamise_aeg',
                                                    }}>
                                                    <MenuItem value={""}>Puudub</MenuItem>
                                                    <MenuItem value={"08:00-22:00"}>08:00-22:00</MenuItem>
                                                    <MenuItem value={"22:00-08:00"}>22:00-08:00</MenuItem>
                                                    <MenuItem value={"teadmata"}>Teadmata</MenuItem>
                                                </Select></div>
                                        </FormControl>

                                    {textfield("juhtuminoustamine", "Juhtumipõhine nõustamine", this.state.formValues.juhtuminoustamine, "\\d*|(\\d+([.,](00?|25|50?|75))?)")}
                                    {textfield("vorgustikutoo", "Võrgustikutöö", this.state.formValues.vorgustikutoo, "\\d*|(\\d+([.,](00?|25|50?|75))?)")}
                                    {textfield("psuhhonoustamine", "Psüh. nõustamine", this.state.formValues.psuhhonoustamine, "\\d*|(\\d+([.,](00?|25|50?|75))?)")}
                                    {textfield("juuranoustamine", "Juriidiline nõustamine", this.state.formValues.juuranoustamine, "\\d*|(\\d+([.,](00?|25|50?|75))?)")}
                                    {textfield("tegevused_lapsega", "Tegevused lapsega", this.state.formValues.tegevused_lapsega, "\\d*|(\\d+([.,](00?|25|50?|75))?)")}
                                    {textfield("tugiteenused", "Tugiteenused", this.state.formValues.tugiteenused, "\\d*|(\\d+([.,](00?|25|50?|75))?)")}
                                    <FormControl margin="normal" fullWidth>
                                        <FormLabel>Turvaline ajutine majutus</FormLabel>
                                    </FormControl>
                                    {textfield("naise_majutus", "Naise majutuspäevade arv", this.state.formValues.naise_majutus, "(\\d*)")}
                                    {textfield("laste_arv", "Kaasasolevate laste arv", this.state.formValues.laste_arv, "(\\d*)")}
                                    {textfield("laste_majutus", "Laste majutuspäevade arv", this.state.formValues.laste_majutus,"(\\d*)")}
                                </Grid>
                                <Grid item sm={4}>
                                    <FormControl margin="normal" fullwidth>
                                        <FormLabel>Võrgustikutöö teiste organisatsioonidega</FormLabel>
                                    </FormControl>
                                    <br/>
                                    <FormControl margin="normal">
                                        <FormLabel>Suunatud MARACi</FormLabel>
                                        <RadioGroup className={classes.radiob}>
                                            <FormControlLabel control={
                                                <Radio
                                                    checked={this.state.formValues.marac === 1}
                                                    onClick={() => this.radioChange("marac", 1)}/>
                                            } label="Jah"/>
                                            <FormControlLabel control={
                                                <Radio
                                                    checked={this.state.formValues.marac === 0}
                                                    onClick={() => this.radioChange("marac", 0)}/>
                                            } label="Ei"/>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormControl margin="normal">
                                        <FormLabel>Juhtumipõhine ümarlaud (v.a. MARAC)</FormLabel>
                                        <RadioGroup className={classes.radiob}>
                                            <FormControlLabel control={
                                                <Radio
                                                    checked={this.state.formValues.umarlaud === 1}
                                                    onClick={() => this.radioChange("umarlaud", 1)}
                                                />
                                            } label="Jah"/>
                                            <FormControlLabel control={
                                                <Radio
                                                    checked={this.state.formValues.umarlaud === 0}
                                                    onClick={() => this.radioChange("umarlaud", 0)}/>
                                            } label="Ei"/>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormControl margin="normal" fullWidth>
                                        <FormLabel>Juhtumisse kaasatud osapooled</FormLabel>
                                        <div>
                                            {checkbox("perearst_kaasatud", this.state.formValues.perearst_kaasatud, "Perearst")}
                                            {checkbox("emo_kaasatud", this.state.formValues.emo_kaasatud, "EMO")}
                                            {checkbox("naistearst_kaasatud", this.state.formValues.naistearst_kaasatud, "Naistearst")}
                                            {checkbox("ohvriabi_kaasatud", this.state.formValues.ohvriabi_kaasatud, "Ohvriabi")}
                                            {checkbox("politsei_kaasatud", this.state.formValues.politsei_kaasatud, "Politsei")}
                                            {checkbox("prokuratuur_kaasatud", this.state.formValues.prokuratuur_kaasatud, "Prokuratuur")}
                                            {checkbox("lastekaitse_kaasatud", this.state.formValues.lastekaitse_kaasatud, "Lastekaitse")}
                                            {checkbox("kov_kaasatud", this.state.formValues.kov_kaasatud, "KOV sotsiaalabi")}
                                            {checkbox("kriminaalkohus_kaasatud", this.state.formValues.kriminaalkohus_kaasatud, "Kohus (kriminaalasjas)")}
                                            {checkbox("tsiviilkohus_kaasatud", this.state.formValues.tsiviilkohus_kaasatud, "Kohus (tsiviilasjas)")}
                                            {checkbox("haridusasutus_kaasatud", this.state.formValues.haridusasutus_kaasatud, "Haridusasutus")}
                                            {checkbox("mtu_kaasatud", this.state.formValues.mtu_kaasatud, "MTÜ-d")}
                                            {checkbox("tuttavad_kaasatud", this.state.formValues.tuttavad_kaasatud, "Sõbrad, sugulased")}
                                        </div>
                                    </FormControl>

                                </Grid>

                                <Grid container
                                      direction="column"
                                      justify="center"
                                      alignItems="center"
                                      spacing={8}>
                                    <Grid item>
                                        <Button
                                            type="submit"
                                            className={classes.button}
                                            variant="contained"
                                            color="primary"
                                        >
                                            Salvesta
                                        </Button>

                                        <Button
                                            className={classes.button}
                                            variant="contained"
                                            color="primary"
                                            onClick={e => navigate("/victim/" + this.props.victimID + "/" + this.props.incidentID)}

                                        >
                                            Tühista
                                        </Button>
                                    </Grid>
                                </Grid>

                            </Grid>

                        </form>
                    </Grid>

                </Grid>

            </Paper>


        </Layout>;
    }
}

NewSession.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(NewSession));
