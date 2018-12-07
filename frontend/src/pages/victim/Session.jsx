import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
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
    },
    input: {
        margin: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
    },
    disabledPaper: {
        backgroundColor: '#e47e001c',
    },
});


class Session extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };


    constructor(props) {
        super(props)
        this.axios = this.props.axios

    }

    componentWillMount() {
        this.getSession()
    }

    getSession() {
        if (this.props.location && this.props.location.state && this.props.location.state.session) {
            const formValues = this.props.location.state["session"];
            formValues['id'] = this.props.sessionID;
            this.setState({
                formValues: formValues,
            });
            console.log("get", this.state.formValues);

        } else {
            this.props.axios.get('get_session.php', {
                params: {
                    id: this.props.sessionID,
                }
            }).then(res => {
                console.log("get_session.php", res.data);
                this.setState({
                    formValues: res.data[0]
                })
            })
                .catch(err => console.log("search err: ", err))
        }


    }

    updateSession = () => {
        this.axios.post("update_session.php", this.state.formValues);
        this.props.location.state["session"] = this.state.formValues
    };

    componentDidMount() {
        this.state.initialValue = Object.assign({}, this.state.formValues)
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
        console.log(this.state)
    };
    handleNumChange = evt => {
        const keyCode = evt.keyCode || evt.which;
        const keyValue = String.fromCharCode(keyCode);
        if (/[+\-\e]/.test(keyValue))
            evt.preventDefault();
    };

    checkboxChange = field => {
        const formValues = this.state.formValues
        formValues[field] = (formValues[field] === 0 || formValues[field] === "") ? 1 : 0;
        this.setState({formValues});
        console.log(this.state)
    };
    radioChange = (field, value) => {
        const formValues = this.state.formValues
        formValues[field] = value
        this.setState({formValues});
        console.log(this.state)
    };

    state = {
        editingEnabled: false,
        formValues: {
            incident_id: this.props.incidentID,
            id: this.props.sessionID,
            kuupaev: "",
            kirjeldus: "",
            sidevahendid: "",
            kriisinoustamine: 0,
            kriisinoustamise_aeg: "teadmata",
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
            prokuratuur_kaasatud: "",
            lastekaitse_kaasatud: "",
            kov_kaasatud: 0,
            tsiviilkohus_kaasatud: 0,
            kriminaalkohus_kaasatud: 0,
            haridusasutus_kaasatud: "",
            mtu_kaasatud: "",
            tuttavad_kaasatud: "",
            markused: ""
        },
        initialValue: {}
    };

    handleUpdate = event => {
        event.preventDefault()
        this.updateSession()
        this.setState({
            editingEnabled: !this.state.editingEnabled,
            initialValue: Object.assign({}, this.state.formValues)
        })
    }

    render() {
        const checkbox = (id, statename, label) => (
            <FormControlLabel control={
                <Checkbox
                    disabled={!this.state.editingEnabled}
                    checked={statename === 1}
                    onClick={() => {
                        this.checkboxChange(id)
                    }}
                />
            } label={label}/>
        )

        const textfield = (id, label, value, pattern) => (

            <TextField
                disabled={!this.state.editingEnabled}
                label={label}
                className={classes.input}
                value={value}
                onChange={this.handleChange}
                id={id}
                inputProps={{pattern: pattern}}
            />
        )

        const {classes} = this.props;
        let dateValue = new Date().toDateInputValue();
        return <Layout title="Sessioon">
            <Typography variant="h4" gutterBottom>
                Sessioon
            </Typography>
            <Paper className={classNames(classes.paper, {
                [classes.disabledPaper]: !this.state.editingEnabled,
            })}>
                <form className={classes.form} onSubmit={this.handleUpdate}>
                    <FormControl margin="normal">
                        <TextField
                            value={this.state.formValues.kuupaev === "" ? dateValue : this.state.formValues.kuupaev}
                            disabled={!this.state.editingEnabled}
                            id="kuupaev"
                            label="Kuupäev"
                            type="date"
                            onChange={this.handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="kirjeldus">Kirjeldus</InputLabel>
                        <Input
                            disabled={!this.state.editingEnabled}
                            value={this.state.formValues.kirjeldus}
                            onChange={this.handleChange}
                            id="kirjeldus"
                        >
                        </Input>
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <FormLabel>Kas nõustamine toimus sidevahendite abil?</FormLabel>
                        <RadioGroup>
                            <FormControlLabel control={
                                <Radio
                                    disabled={!this.state.editingEnabled}
                                    checked={this.state.formValues.sidevahendid === 1}
                                    onClick={() => this.radioChange("sidevahendid", 1)}/>
                            } label="Jah"/>
                            <FormControlLabel control={
                                <Radio
                                    disabled={!this.state.editingEnabled}
                                    checked={this.state.formValues.sidevahendid === 0}
                                    onClick={() => this.radioChange("sidevahendid", 0)}/>
                            } label="Ei"/>
                        </RadioGroup>
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <FormLabel>Osutatud teenused (tundide arv)</FormLabel>
                    </FormControl>
                    {textfield("kriisinoustamine", "Kriisinõustamine", this.state.formValues.kriisinoustamine, "(\\d*)([.]\\d+)?")}
                    {this.state.formValues.kriisinoustamine > 0 ?
                        <FormControl>
                            <div className={classes.input}>
                                <InputLabel htmlFor="kriisinoustamise_aeg">Kriisinõustamise aeg</InputLabel>
                                <Select
                                    disabled={!this.state.editingEnabled}
                                    value={this.state.formValues.kriisinoustamise_aeg}
                                    onChange={this.handleSelectChange}
                                    inputProps={{
                                        name: 'kriisinoustamise_aeg',
                                        id: 'kriisinoustamise_aeg',
                                    }}>
                                    <MenuItem value={"08:00-22:00"}>08:00-22:00</MenuItem>
                                    <MenuItem value={"22:00-08:00"}>22:00-08:00</MenuItem>

                                    <MenuItem value={"teadmata"}>Teadmata</MenuItem>
                                </Select></div>
                        </FormControl> : null}
                    {textfield("juhtuminoustamine", "Juhtumipõhine nõustamine", this.state.formValues.juhtuminoustamine, "(\\d*)([.]\\d+)?")}
                    {textfield("vorgustikutoo", "Võrgustikutöö", this.state.formValues.vorgustikutoo, "(\\d*)([.]\\d+)?")}
                    {textfield("psuhhonoustamine", "Psüh. nõustamine", this.state.formValues.psuhhonoustamine, "(\\d*)([.]\\d+)?")}
                    {textfield("juuranoustamine", "Juriidiline nõustamine", this.state.formValues.juuranoustamine, "(\\d*)([.]\\d+)?")}
                    {textfield("tegevused_lapsega", "Tegevused lapsega", this.state.formValues.tegevused_lapsega, "(\\d*)([.]\\d+)?")}
                    {textfield("tugiteenused", "Tugiteenused", this.state.formValues.tugiteenused, "(\\d*)([.]\\d+)?")}
                    {textfield("naise_majutus", "Naise majutuspäevade arv", this.state.formValues.naise_majutus, "(\\d*)([.]\\d+)?")}
                    {textfield("laste_arv", "Kaasasolevate laste arv", this.state.formValues.laste_arv, "(\\d*)")}
                    {textfield("laste_majutus", "Laste majutuspäevade arv", this.state.formValues.laste_majutus, "(\\d*)([.]\\d+)?")}

                    <FormControl margin="normal" fullWidth>
                        <FormLabel>Võrgustikutöö teiste organisatsioonidega</FormLabel>
                    </FormControl>
                    <FormControl margin="normal">
                        <FormLabel>Juhtumipõhine ümarlaud (v.a. MARAC)</FormLabel>
                        <RadioGroup>
                            <FormControlLabel control={
                                <Radio
                                    disabled={!this.state.editingEnabled}
                                    checked={this.state.formValues.umarlaud === 1}
                                    onClick={() => this.radioChange("marac", 1)}/>
                            } label="Jah"/>
                            <FormControlLabel control={
                                <Radio
                                    disabled={!this.state.editingEnabled}
                                    checked={this.state.formValues.umarlaud === 0}
                                    onClick={() => this.radioChange("marac", 0)}/>
                            } label="Ei"/>
                        </RadioGroup>
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <FormLabel>Suunatud MARACi</FormLabel>
                        <RadioGroup>
                            <FormControlLabel control={
                                <Radio
                                    disabled={!this.state.editingEnabled}
                                    checked={this.state.formValues.marac === 1}
                                    onClick={() => this.radioChange("marac", 1)}/>
                            } label="Jah"/>
                            <FormControlLabel control={
                                <Radio
                                    disabled={!this.state.editingEnabled}
                                    checked={this.state.formValues.marac === 0}
                                    onClick={() => this.radioChange("marac", 0)}/>
                            } label="Ei"/>
                        </RadioGroup>
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <FormLabel>Juhtumisse kaasatud osapooled</FormLabel>
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
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
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="markused">Märkused</InputLabel>
                        <Input
                            disabled={!this.state.editingEnabled}
                            value={this.state.formValues.markused}
                            onChange={this.handleChange}
                            id="markused"
                        >
                        </Input>
                    </FormControl>

                    <Grid container
                          direction="column"
                          justify="center"
                          alignItems="center"
                          spacing={8}>
                        <Grid item>

                            {!this.state.editingEnabled ?
                                <Button
                                    className={classes.button}
                                    variant="contained"
                                    color="primary"
                                    onClick={e => this.setState({
                                        editingEnabled: !this.state.editingEnabled
                                    })}
                                >
                                    MUUDA SESSIOONI ANDMEID
                                </Button> : null}

                            {this.state.editingEnabled ?
                                <Button
                                    className={classes.button}
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    SALVESTA
                                </Button> : null}

                            {this.state.editingEnabled ?
                                <Button
                                    className={classes.button}
                                    variant="contained"
                                    color="primary"
                                    onClick={e => {
                                        this.setState({
                                            editingEnabled: !this.state.editingEnabled,
                                            formValues: Object.assign({}, this.state.initialValue)
                                        });


                                    }}
                                >
                                    TÜHISTA
                                </Button> : null}
                        </Grid>
                    </Grid>
                </form>


            </Paper>

            <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={e => navigate("/victim/" + this.props.victimID + "/" + this.props.incidentID)}

            >
                TAGASI
            </Button>


        </Layout>
    }
}

Session.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Session));
