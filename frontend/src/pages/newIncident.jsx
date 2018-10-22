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
            id: this.props.victimID,
            piirkond: "",
            keel: "",
            vanus: "",
            puue: "",
            lapsed: "",
            rasedus: "",
            elukoht: "",
            vaimne_vagivald: "",
            fuusiline_vagivald: "",
            majanduslik_vagivald: "",
            seksuaalne_vagivald: "",
            inimkaubandus: "",
            teadmata_vagivald: "",
            partner_vagivallatseja: "",
            ekspartner_vagivallatseja: "",
            vanem_vagivallatseja: "",
            laps_vagivallatseja: "",
            sugulane_vagivallatseja: "",
            tookaaslane_vagivallatseja: "",
            muu_vagivallatseja: "",
            vagivallatseja_vanus: "",
            vagivallatseja_sugu: "",
            laps_ohver: "",
            vana_ohver: "",
            muu_ohver: "",
            politsei: "",
            rahastus: ""


        },
    };

    render() {
        const {classes} = this.props;

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
                            <MenuItem value={"Tartumaa"}>Tartumaa</MenuItem>
                            <MenuItem value={"Harjumaa"}>Harjumaa</MenuItem>
                            <MenuItem value={"Pärnumaa"}>Pärnumaa</MenuItem>
                            <MenuItem value={"Saaremaa"}>Saaremaa</MenuItem>
                            <MenuItem value={"Hiiumaa"}>Hiiumaa</MenuItem>
                            <MenuItem value={"Võrumaa"}>Võrumaa</MenuItem>
                            <MenuItem value={"Ida-Virumaa"}>Ida-Virumaa</MenuItem>
                            <MenuItem value={"Lääne-Virumaa"}>Lääne-Virumaa</MenuItem>
                            <MenuItem value={"Põlvamaa"}>Põlvamaa</MenuItem>
                            <MenuItem value={"Viljandimaa"}>Viljandimaa</MenuItem>
                            <MenuItem value={"Raplamaa"}>Raplamaa</MenuItem>
                            <MenuItem value={"Jõgevamaa"}>Jõgevamaa</MenuItem>
                            <MenuItem value={"Läänemaa"}>Läänemaa</MenuItem>
                            <MenuItem value={"Järvamaa"}>Järvamaa</MenuItem>
                            <MenuItem value={"Valgamaa"}>Valgamaa</MenuItem>
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
                            <MenuItem value={"Eesti"}>Eesti</MenuItem>
                            <MenuItem value={"Vene"}>Vene</MenuItem>
                            <MenuItem value={"Inglise"}>Inglise</MenuItem>
                            <MenuItem value={"Muu"}>Muu</MenuItem>
                            <MenuItem value={"Teadmata"}>Teadmata</MenuItem>

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
                            <MenuItem value={"Teadmata"}>Teadmata</MenuItem>
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
                            <MenuItem value={"teadmata"}>Teadmata</MenuItem>
                            <MenuItem value={"Tartumaa"}>Tartumaa</MenuItem>
                            <MenuItem value={"Harjumaa"}>Harjumaa</MenuItem>
                            <MenuItem value={"Pärnumaa"}>Pärnumaa</MenuItem>
                            <MenuItem value={"Saaremaa"}>Saaremaa</MenuItem>
                            <MenuItem value={"Hiiumaa"}>Hiiumaa</MenuItem>
                            <MenuItem value={"Võrumaa"}>Võrumaa</MenuItem>
                            <MenuItem value={"Ida-Virumaa"}>Ida-Virumaa</MenuItem>
                            <MenuItem value={"Lääne-Virumaa"}>Lääne-Virumaa</MenuItem>
                            <MenuItem value={"Põlvamaa"}>Põlvamaa</MenuItem>
                            <MenuItem value={"Viljandimaa"}>Viljandimaa</MenuItem>
                            <MenuItem value={"Raplamaa"}>Raplamaa</MenuItem>
                            <MenuItem value={"Jõgevamaa"}>Jõgevamaa</MenuItem>
                            <MenuItem value={"Läänemaa"}>Läänemaa</MenuItem>
                            <MenuItem value={"Järvamaa"}>Järvamaa</MenuItem>
                            <MenuItem value={"Valgamaa"}>Valgamaa</MenuItem>
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
                            <MenuItem value={"Teadmata"}>Teadmata</MenuItem>
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
                <Link to="/overview">
                    <Button
                        variant="contained"
                        color="primary"
                    >
                        Salvesta
                    </Button>
                </Link>
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

export default withRoot(withStyles(styles)(newIncident));
