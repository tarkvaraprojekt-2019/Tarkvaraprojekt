import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
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
import { navigate } from 'gatsby';


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
            }).then( res => {
                console.log("get_session.php", res.data);
                this.setState({
                    formValues: res.data[0]
                })
            })
                .catch( err => console.log("search err: ", err))
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
            juhutuminoustamine: 0,
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


    render() {
        const {classes} = this.props;
        let dateValue = new Date().toDateInputValue();
        return <Layout title="Uus juhtum">
            <Typography variant="h4" gutterBottom>
                Sessioon
            </Typography>
          <Paper className={classNames(classes.paper, {
            [classes.disabledPaper]: !this.state.editingEnabled,
          })}>

                <Grid container
                      direction="column"
                      justify="center"
                      alignItems="center"
                      spacing={8}>
                    <Grid item>

                        <form className={classes.form}>
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

                            <FormControl margin="normal">
                                <InputLabel htmlFor="kriisinoustamine">Kriisinõustamine</InputLabel>
                                <Input
                                    disabled={!this.state.editingEnabled}
                                    type="number"
                                    step="0.01"
                                    value={this.state.formValues.kriisinoustamine}
                                    onKeyPress={this.handleNumChange}
                                    onChange={this.handleChange}
                                    id="kriisinoustamine"
                                >
                                </Input>
                            </FormControl>
                            {this.state.formValues.kriisinoustamine !== 0 ?
                                <FormControl margin="normal">
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
                                    </Select>
                                </FormControl> : null}
                            <FormControl margin="normal">
                                <InputLabel htmlFor="juhutuminoustamine">Juhtumipõhine nõustamine</InputLabel>
                                <Input
                                    disabled={!this.state.editingEnabled}
                                    type="number"
                                    step="0.01"
                                    value={this.state.formValues.juhutuminoustamine}
                                    onKeyPress={this.handleNumChange}
                                    onChange={this.handleChange}
                                    id="juhutuminoustamine"
                                >
                                </Input>
                            </FormControl>
                            <FormControl margin="normal">
                                <InputLabel htmlFor="vorgustikutoo">Võrgustikutöö</InputLabel>
                                <Input
                                    disabled={!this.state.editingEnabled}
                                    type="number"
                                    step="0.01"
                                    value={this.state.formValues.vorgustikutoo}
                                    onKeyPress={this.handleNumChange}
                                    onChange={this.handleChange}
                                    id="vorgustikutoo"
                                >
                                </Input>
                            </FormControl>
                            <FormControl margin="normal">
                                <InputLabel htmlFor="psuhhonoustamine">Psühholoogiline nõustamine,
                                    psühhoteraapia</InputLabel>
                                <Input
                                    disabled={!this.state.editingEnabled}
                                    type="number"
                                    step="0.01"
                                    value={this.state.formValues.psuhhonoustamine}
                                    onKeyPress={this.handleNumChange}
                                    onChange={this.handleChange}
                                    id="psuhhonoustamine"
                                >
                                </Input>
                            </FormControl>
                            <FormControl margin="normal">
                                <InputLabel htmlFor="juuranoustamine">Juriidiline nõustamine</InputLabel>
                                <Input
                                    disabled={!this.state.editingEnabled}
                                    type="number"
                                    step="0.01"
                                    value={this.state.formValues.juuranoustamine}
                                    onKeyPress={this.handleNumChange}
                                    onChange={this.handleChange}
                                    id="juuranoustamine"
                                >
                                </Input>
                            </FormControl>
                            <FormControl margin="normal">
                                <InputLabel htmlFor="tegevused_lapsega">Tegevused lapsega</InputLabel>
                                <Input
                                    disabled={!this.state.editingEnabled}
                                    type="number"
                                    step="0.01"
                                    value={this.state.formValues.tegevused_lapsega}
                                    onKeyPress={this.handleNumChange}
                                    onChange={this.handleChange}
                                    id="tegevused_lapsega"
                                >
                                </Input>
                            </FormControl>
                            <FormControl margin="normal">
                                <InputLabel htmlFor="tugiteenused">Tugiteenused</InputLabel>
                                <Input
                                    disabled={!this.state.editingEnabled}
                                    type="number"
                                    step="0.01"
                                    value={this.state.formValues.tugiteenused}
                                    onKeyPress={this.handleNumChange}
                                    onChange={this.handleChange}
                                    id="tugiteenused"
                                >
                                </Input>
                            </FormControl>
                            <FormControl margin="normal">
                                <InputLabel htmlFor="naise_majutus">Naise majutuspäevade arv</InputLabel>
                                <Input
                                    disabled={!this.state.editingEnabled}
                                    type="number"
                                    step="0.01"
                                    value={this.state.formValues.naise_majutus}
                                    onKeyPress={this.handleNumChange}
                                    onChange={this.handleChange}
                                    id="naise_majutus"
                                >
                                </Input>
                            </FormControl>
                            <FormControl margin="normal">
                                <InputLabel htmlFor="laste_arv">Kaasasolevate laste arv</InputLabel>
                                <Input
                                    disabled={!this.state.editingEnabled}
                                    type="number"
                                    step="0.01"
                                    value={this.state.formValues.laste_arv}
                                    onKeyPress={this.handleNumChange}
                                    onChange={this.handleChange}
                                    id="laste_arv"
                                >
                                </Input>
                            </FormControl>
                            <FormControl margin="normal">
                                <InputLabel htmlFor="laste_majutus">Laste majutuspäevade arv</InputLabel>
                                <Input
                                    disabled={!this.state.editingEnabled}
                                    type="number"
                                    step="0.01"
                                    value={this.state.formValues.laste_majutus}
                                    onKeyPress={this.handleNumChange}
                                    onChange={this.handleChange}
                                    id="laste_majutus"
                                >
                                </Input>
                            </FormControl>
                            <FormControl margin="normal" fullWidth>
                                <FormLabel>Võrgustikutöö teiste organisatsioonidega</FormLabel>
                            </FormControl>
                            <FormControl margin="normal">
                                <InputLabel htmlFor="umarlaud">Juhtumipõhiste ümarlaudade arv (v.a. MARAC)</InputLabel>
                                <Input
                                    disabled={!this.state.editingEnabled}
                                    type="number"
                                    step="0.01"
                                    value={this.state.formValues.umarlaud}
                                    onKeyPress={this.handleNumChange}
                                    onChange={this.handleChange}
                                    id="umarlaud"
                                >
                                </Input>
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
                                    <FormControlLabel control={
                                        <Checkbox
                                            disabled={!this.state.editingEnabled}
                                            checked={this.state.formValues.perearst_kaasatud === 1}
                                            onClick={() => {
                                                this.checkboxChange("perearst_kaasatud")
                                            }}
                                        />
                                    } label="Perearst"/>
                                    <FormControlLabel control={
                                        <Checkbox
                                            disabled={!this.state.editingEnabled}
                                            checked={this.state.formValues.emo_kaasatud === 1}
                                            onClick={() => {
                                                this.checkboxChange("emo_kaasatud")
                                            }}
                                        />
                                    } label="EMO"/>
                                    <FormControlLabel control={
                                        <Checkbox
                                            disabled={!this.state.editingEnabled}
                                            checked={this.state.formValues.naistearst_kaasatud === 1}
                                            onClick={() => {
                                                this.checkboxChange("naistearst_kaasatud")
                                            }}
                                        />
                                    } label="Naistearst"/>
                                    <FormControlLabel control={
                                        <Checkbox
                                            disabled={!this.state.editingEnabled}
                                            checked={this.state.formValues.politsei_kaasatud === 1}
                                            onClick={() => {
                                                this.checkboxChange("politsei_kaasatud")
                                            }}
                                        />
                                    } label="Politsei"/>
                                    <FormControlLabel control={
                                        <Checkbox
                                            disabled={!this.state.editingEnabled}
                                            checked={this.state.formValues.prokuratuur_kaasatud === 1}
                                            onClick={() => {
                                                this.checkboxChange("prokuratuur_kaasatud")
                                            }}
                                        />
                                    } label="Prokuratuur"/>
                                    <FormControlLabel control={
                                        <Checkbox
                                            disabled={!this.state.editingEnabled}
                                            checked={this.state.formValues.lastekaitse_kaasatud === 1}
                                            onClick={() => {
                                                this.checkboxChange("lastekaitse_kaasatud")
                                            }}
                                        />
                                    } label="Lastekaitse"/>
                                    <FormControlLabel control={
                                        <Checkbox
                                            disabled={!this.state.editingEnabled}
                                            checked={this.state.formValues.kov_kaasatud === 1}
                                            onClick={() => {
                                                this.checkboxChange("kov_kaasatud")
                                            }}
                                        />
                                    } label="KOV sotsiaalabi"/>
                                    <FormControlLabel control={
                                        <Checkbox
                                            disabled={!this.state.editingEnabled}
                                            checked={this.state.formValues.kriminaalkohus_kaasatud === 1}
                                            onClick={() => {
                                                this.checkboxChange("kriminaalkohus_kaasatud")
                                            }}
                                        />
                                    } label="Kohus (kriminaalasjas)"/>
                                    <FormControlLabel control={
                                        <Checkbox
                                            disabled={!this.state.editingEnabled}
                                            checked={this.state.formValues.tsiviilkohus_kaasatud === 1}
                                            onClick={() => {
                                                this.checkboxChange("tsiviilkohus_kaasatud")
                                            }}
                                        />
                                    } label="Kohus (tsiviilasjas)"/>
                                    <FormControlLabel control={
                                        <Checkbox
                                            disabled={!this.state.editingEnabled}
                                            checked={this.state.formValues.haridusasutus_kaasatud === 1}
                                            onClick={() => {
                                                this.checkboxChange("haridusasutus_kaasatud")
                                            }}
                                        />
                                    } label="Haridusasutus"/>
                                    <FormControlLabel control={
                                        <Checkbox
                                            disabled={!this.state.editingEnabled}
                                            checked={this.state.formValues.mtu_kaasatud === 1}
                                            onClick={() => {
                                                this.checkboxChange("mtu_kaasatud")
                                            }}
                                        />
                                    } label="MTÜ-d"/>
                                    <FormControlLabel control={
                                        <Checkbox
                                            disabled={!this.state.editingEnabled}
                                            checked={this.state.formValues.tuttavad_kaasatud === 1}
                                            onClick={() => {
                                                this.checkboxChange("tuttavad_kaasatud")
                                            }}
                                        />
                                    } label="Sõbrad, sugulased"/>
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
                        </form>
                    </Grid>
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
                                MUUDA JUHTUMI ANDMEID
                            </Button> : null}

                        {this.state.editingEnabled ?
                            <Button
                                className={classes.button}
                                type="submit"
                                variant="contained"
                                color="primary"
                                onClick={e => {

                                    this.updateSession();
                                    this.setState({
                                        editingEnabled: !this.state.editingEnabled,
                                        initialValue: Object.assign({}, this.state.formValues)
                                    })


                                }}
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

            </Paper>

            <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={e => navigate("/victim/" + this.props.victimID +  "/" + this.props.incidentID)}

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
