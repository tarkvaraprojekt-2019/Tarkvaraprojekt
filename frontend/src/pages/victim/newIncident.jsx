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
import Checkbox from '@material-ui/core/Checkbox';


import withRoot from '../../withRoot';

import Layout from '../../components/Layout/index';

import { piirkonnad } from '../../util';




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


class NewIncident extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };
    constructor(props) {
        super(props)
        this.axios = this.props.axios
    }

    createIncident(){
        this.axios.post('create_incident.php', this.state.formValues)
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
        formValues: {
            kliendi_nr: this.props.victimID,
            piirkond: "",
            keel: "",
            vanus: "",
            puue: "",
            lapsed: "",
            rasedus: "",
            elukoht: "",
            vaimne_vagivald: 0,
            fuusiline_vagivald: 0,
            majanduslik_vagivald: 0,
            seksuaalne_vagivald: 0,
            inimkaubandus: 0,
            teadmata_vagivald: 0,
            partner_vagivallatseja: 0,
            ekspartner_vagivallatseja: 0,
            vanem_vagivallatseja: 0,
            laps_vagivallatseja: 0,
            sugulane_vagivallatseja: 0,
            tookaaslane_vagivallatseja: 0,
            muu_vagivallatseja: 0,
            vagivallatseja_vanus: "",
            vagivallatseja_sugu: "",
            laps_ohver: 0,
            vana_ohver: 0,
            muu_ohver: 0,
            politsei: "",
            rahastus: ""


        },
    };

    render() {
        const {classes} = this.props;
        const piirkonnadMenuItems = piirkonnad.map(p => <MenuItem value={p}>{p}</MenuItem>)

        return <Layout title="Uus juhtum">
            <Typography variant="h4" gutterBottom>
                Lisa uus juhtum
            </Typography>
            <Paper className={classes.paper}>
                <form className={classes.form}>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="piirkond">Piirkond</InputLabel>
                        <Select
                            value={this.state.formValues.piirkond}
                            onChange={this.handleSelectChange}
                            inputProps={{
                                name: 'piirkond',
                                id: 'piirkond',
                            }}>
                            { piirkonnadMenuItems }
                        </Select>
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="keel">Suhtluskeel</InputLabel>
                        <Select
                            value={this.state.formValues.keel}
                            onChange={this.handleSelectChange}
                            inputProps={{
                                name: 'keel',
                                id: 'keel',
                            }}>
                            <MenuItem value={"eesti"}>Eesti</MenuItem>
                            <MenuItem value={"vene"}>Vene</MenuItem>
                            <MenuItem value={"inglise"}>Inglise</MenuItem>
                            <MenuItem value={"muu"}>Muu</MenuItem>
                            <MenuItem value={"teadmata"}>Teadmata</MenuItem>

                        </Select>
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="vanus">Vanus</InputLabel>
                        <Select
                            value={this.state.formValues.vanus}
                            onChange={this.handleSelectChange}
                            inputProps={{
                                name: 'vanus',
                                id: 'vanus',
                            }}>
                            <MenuItem value={"alla_18"}>Alla 18</MenuItem>
                            <MenuItem value={"18-24"}>18-24</MenuItem>
                            <MenuItem value={"25-49"}>25-49</MenuItem>
                            <MenuItem value={"50-64"}>50-64</MenuItem>
                            <MenuItem value={"üle 65"}>Üle 65</MenuItem>
                            <MenuItem value={"teadmata"}>Teadmata</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <FormLabel>Puue</FormLabel>
                        <RadioGroup>
                            <FormControlLabel control={
                                <Radio

                                    checked={this.state.formValues.puue === 1}
                                    onClick={() => this.radioChange("puue", 1)}/>
                            } label="Jah"/>
                            <FormControlLabel control={
                                <Radio
                                    checked={this.state.formValues.puue === 0}
                                    onClick={() => this.radioChange("puue", 0)}/>
                            } label="Ei"/>
                        </RadioGroup>
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="lapsed">Alaealiste laste arv</InputLabel>
                        <Input
                            type="number"
                            id="lapsed"
                            onChange={this.handleChange}
                            value={this.state.formValues.lapsed}/>
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <FormLabel>Rasedus</FormLabel>
                        <RadioGroup>
                            <FormControlLabel control={
                                <Radio

                                    checked={this.state.formValues.rasedus === 1}
                                    onClick={() => this.radioChange("rasedus", 1)}
                                />
                            } label="Jah"/>
                            <FormControlLabel control={
                                <Radio
                                    checked={this.state.formValues.rasedus === 0}
                                    onClick={() => this.radioChange("rasedus", 0)}
                                />
                            } label="Ei"/>
                        </RadioGroup>
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="piirkond">Elukoht</InputLabel>
                        <Select
                            value={this.state.formValues.elukoht}
                            onChange={this.handleSelectChange}
                            inputProps={{
                                name: 'elukoht',
                                id: 'elukoht',
                            }}>
                            
                            { piirkonnadMenuItems }
                        </Select>
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <FormLabel>Vägivalla liik</FormLabel>
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <div>
                            <FormControlLabel control={
                                <Checkbox

                                    checked={this.state.formValues.fuusiline_vagivald === 1}
                                    onClick={() => {
                                        this.checkboxChange("fuusiline_vagivald")
                                        this.setState(prevState => ({
                                            formValues: {
                                                ...prevState.formValues,
                                                teadmata_vagivald: 0
                                            }
                                        }))
                                    }}
                                />
                            } label="Füüsiline vägivald"/>
                            <FormControlLabel control={
                                <Checkbox
                                    checked={this.state.formValues.vaimne_vagivald === 1}
                                    onClick={() => {
                                        this.checkboxChange("vaimne_vagivald")
                                        this.setState(prevState => ({
                                            formValues: {
                                                ...prevState.formValues,
                                                teadmata_vagivald: 0
                                            }
                                        }))
                                    }}
                                />
                            } label="Vaimne vägivald"/>
                            <FormControlLabel control={
                                <Checkbox
                                    checked={this.state.formValues.majanduslik_vagivald === 1}
                                    onClick={() => {
                                        this.checkboxChange("majanduslik_vagivald")
                                        this.setState(prevState => ({
                                            formValues: {
                                                ...prevState.formValues,
                                                teadmata_vagivald: 0
                                            }
                                        }))
                                    }}
                                />
                            } label="Majanduslik vägivald"/>
                            <FormControlLabel control={
                                <Checkbox
                                    checked={this.state.formValues.seksuaalne_vagivald === 1}
                                    onClick={() => {
                                        this.checkboxChange("seksuaalne_vagivald")
                                        this.setState(prevState => ({
                                            formValues: {
                                                ...prevState.formValues,
                                                teadmata_vagivald: 0
                                            }
                                        }))
                                    }}
                                />
                            } label="Seksuaalne vägivald"/>
                            <FormControlLabel control={
                                <Checkbox
                                    checked={this.state.formValues.inimkaubandus === 1}
                                    onClick={() => {
                                        this.checkboxChange("inimkaubandus")
                                        this.setState(prevState => ({
                                            formValues: {
                                                ...prevState.formValues,
                                                teadmata_vagivald: 0
                                            }
                                        }))
                                    }}
                                />
                            } label="Inimkaubandus"/>
                            <FormControlLabel control={
                                <Checkbox
                                    checked={this.state.formValues.teadmata_vagivald === 1}
                                    onClick={() => {
                                        this.checkboxChange("teadmata_vagivald")
                                        this.setState(prevState => ({
                                            formValues: {
                                                ...prevState.formValues,
                                                inimkaubandus: 0,
                                                seksuaalne_vagivald: 0,
                                                majanduslik_vagivald: 0,
                                                vaimne_vagivald: 0,
                                                fuusiline_vagivald: 0
                                            }
                                        }))
                                    }}
                                />
                            } label="Teadmata vägivald"/>
                        </div>
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <FormLabel>Vägivallatseja</FormLabel>
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <div>
                            <FormControlLabel control={
                                <Checkbox
                                    checked={this.state.formValues.partner_vagivallatseja === 1}
                                    onClick={() => {
                                        this.checkboxChange("partner_vagivallatseja")
                                    }}/>
                            } label="Partner"/>
                            <FormControlLabel control={
                                <Checkbox
                                    checked={this.state.formValues.ekspartner_vagivallatseja === 1}
                                    onClick={() => {
                                        this.checkboxChange("ekspartner_vagivallatseja")
                                    }}/>
                            } label="Ekspartner"/>
                            <FormControlLabel control={
                                <Checkbox
                                    checked={this.state.formValues.vanem_vagivallatseja === 1}
                                    onClick={() => {
                                        this.checkboxChange("vanem_vagivallatseja")
                                    }}/>
                            } label="Isa/ema*"/>
                            <FormControlLabel control={
                                <Checkbox
                                    checked={this.state.formValues.laps_vagivallatseja === 1}
                                    onClick={() => {
                                        this.checkboxChange("laps_vagivallatseja")
                                    }}/>
                            } label="Poeg/tütar*"/>
                            <FormControlLabel control={
                                <Checkbox
                                    checked={this.state.formValues.sugulane_vagivallatseja === 1}
                                    onClick={() => {
                                        this.checkboxChange("sugulane_vagivallatseja")
                                    }}/>
                            } label="Sugulane/hõimlane*"/>
                            <FormControlLabel control={
                                <Checkbox
                                    checked={this.state.formValues.tookaaslane_vagivallatseja === 1}
                                    onClick={() => {
                                        this.checkboxChange("tookaaslane_vagivallatseja")
                                    }}/>
                            } label="Töö- või õpingukaaslane*"/>
                            <FormControlLabel control={
                                <Checkbox
                                    checked={this.state.formValues.muu_vagivallatseja === 1}
                                    onClick={() => {
                                        this.checkboxChange("muu_vagivallatseja")
                                    }}/>
                            } label="Muu*"/>
                        </div>
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="vagivallatseja_vanus">Vägivallatseja vanus</InputLabel>
                        <Select
                            value={this.state.formValues.vagivallatseja_vanus}
                            onChange={this.handleSelectChange}
                            inputProps={{
                                name: 'vagivallatseja_vanus',
                                id: 'vagivallatseja_vanus',
                            }}>
                            <MenuItem value={"alla_18"}>Alla 18</MenuItem>
                            <MenuItem value={"18-24"}>18-24</MenuItem>
                            <MenuItem value={"25-49"}>25-49</MenuItem>
                            <MenuItem value={"50-64"}>50-64</MenuItem>
                            <MenuItem value={"üle 65"}>Üle 65</MenuItem>
                            <MenuItem value={"teadmata"}>Teadmata</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <FormLabel>Vägivallatseja sugu</FormLabel>
                        <RadioGroup>
                            <FormControlLabel control={
                                <Radio

                                    checked={this.state.formValues.vagivallatseja_sugu === "Mees"}
                                    onClick={() => this.radioChange("vagivallatseja_sugu", "Mees")}
                                />
                            } label="Mees"/>
                            <FormControlLabel control={
                                <Radio
                                    checked={this.state.formValues.vagivallatseja_sugu === "Naine"}
                                    onClick={() => this.radioChange("vagivallatseja_sugu", "Naine")}
                                />
                            } label="Naine"/>
                            <FormControlLabel control={
                                <Radio
                                    checked={this.state.formValues.vagivallatseja_sugu === "teadmata"}
                                    onClick={() => this.radioChange("vagivallatseja_sugu", "teadmata")}
                                />
                            } label="Teadmata"/>
                        </RadioGroup>
                    </FormControl>

                    <FormControl margin="normal" fullWidth>
                        <FormLabel>Ohvrid lisaks naisele</FormLabel>
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <div>
                            <FormControlLabel control={
                                <Checkbox
                                    checked={this.state.formValues.laps_ohver === 1}
                                    onClick={() => {
                                        this.checkboxChange("laps_ohver")
                                    }}/>
                            } label="Alaealised lapsed"/>
                            <FormControlLabel control={
                                <Checkbox
                                    checked={this.state.formValues.vana_ohver === 1}
                                    onClick={() => {
                                        this.checkboxChange("vana_ohver")
                                    }}/>
                            } label="Eakad (üle 65)"/>
                            <FormControlLabel control={
                                <Checkbox
                                    checked={this.state.formValues.muu_ohver === 1}
                                    onClick={() => {
                                        this.checkboxChange("muu_ohver")
                                    }}/>
                            } label="Muud*"/>
                        </div>
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <FormLabel>Kas ohver on varasemalt politseiga kontakteerunud?</FormLabel>
                        <RadioGroup>
                            <FormControlLabel control={
                                <Radio

                                    checked={this.state.formValues.politsei === 1}
                                    onClick={() => this.radioChange("politsei", 1)}
                                />
                            } label="Jah"/>
                            <FormControlLabel control={
                                <Radio
                                    checked={this.state.formValues.politsei === 0}
                                    onClick={() => this.radioChange("politsei", 0)}
                                />
                            } label="Ei"/>
                        </RadioGroup>
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="rahastus">Rahastuse liik</InputLabel>
                        <Select
                            value={this.state.formValues.rahastus}
                            onChange={this.handleSelectChange}
                            inputProps={{
                                name: 'rahastus',
                                id: 'rahastus',
                            }}>
                            <MenuItem value={"Muu rahastus"}>Muu rahastus</MenuItem>
                            <MenuItem value={"NTK rahastus"}>NTK rahastus</MenuItem>
                        </Select>
                    </FormControl>


                </form>
            </Paper>

            <Paper className={classes.paper}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        this.createIncident()
                    }}                >
                    Salvesta
                </Button>
                <Link to="/overview">

                    <Button
                        variant="contained"
                        color="primary"
                    >
                        Tühista
                    </Button>
                </Link>
            </Paper>


        </Layout>;
    }
}

NewIncident.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(NewIncident));
