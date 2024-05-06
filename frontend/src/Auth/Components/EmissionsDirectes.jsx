import { useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Button,
  Paper,
  Dialog,
  DialogContent,
  TextField,
} from "@mui/material";
import CroixIcon from "./CroixIcon";
const Styles = {
  contenuEtape: {
    fontSize: "18px",
    fontWeight: 400,
    lineHeight: "24px",
    textAlign: "left",
    color: "#003049",
  },
  ajouterActiviteButton: {
    width: "150px",
    height: "32px",
    gap: "0px",
    borderRadius: "10px 10px 10px 10px",
    border: "1px solid #003049",
    background: "#FFFFFF",
    color: "#003049",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "16px",
    textAlign: "center",
  },
  customSelect: {
    fontFamily: "Inter, sans-serif",
    height: "45px",
    width: "100%",
    padding: "10px",
    borderRadius: "15px",
    border: "0px solid #003049",
    backgroundColor: "#EEF5FC",
    outline: "none",
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23003049'><path d='M7 10l5 5 5-5z'/></svg>`
    )}")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 10px top 50%",
    backgroundSize: "12px",
    cursor: "pointer",
    color: "#4D4D4D",
  },
  customTitle: {
    fontFamily: "Inter, sans-serif",
    fontSize: "18px",
    fontWeight: 400,
    lineHeight: "24px",
    textAlign: "left",
    color: "#212121",
  },
  rechercheButton: {
    fontFamily: "Inter, sans-serif",
    width: "100%",
    height: "48px",
    padding: "14px 32px 14px 32px",
    gap: "10px",
    borderRadius: "15px 15px 15px 15px",
    background: "linear-gradient(117.07deg, #003049 0%, #2094F3 301.94%)",
    color: "white",
  },
  annulerButton: {
    fontFamily: "Inter, sans-serif",
    border: "1px solid #D62828",
    borderRadius: "15px",
    backgroundColor: "#FFFFFF",
    color: "#D62828",
    height: "48px",
  },
  validerButton: {
    fontFamily: "Inter, sans-serif",
    background: "#003049",
    borderRadius: "15px",
    height: "48px",
  },
  Button_Link_Medium: {
    fontFamily: "Inter, sans-serif",
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "20px",
    textAlign: "center",
  },
  rechercherText: {
    fontFamily: "Inter, sans-serif",
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "20px",
    textAlign: "center",
    textTransform: "none",
  },
  annulerText: {
    fontFamily: "Inter, sans-serif",
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "20px",
    textAlign: "center",
    color: "#D62828",
    textTransform: "none",
  },
  validerText: {
    fontFamily: "Inter, sans-serif",
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "20px",
    textAlign: "center",
    textTransform: "none",
  },
  ajouterText: {
    fontFamily: "Inter, sans-serif",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "16px",
    textAlign: "center",
    color: "#003049",
    textTransform: "none",
  },
};

function EmissionsDirectes() {
  const [emissionsList, setEmissionsList] = useState([
    {
      label: "émissions directes des sources fixes de combustion",
      dialogueOptions: [{ label: "Combustibles", value: "Combustibles" }],
      selectedOptions: [],
    },
    {
      label: "émissions directes des sources mobiles de combustion",
      dialogueOptions: [{ label: "Combustibles", value: "Combustibles" }],
      selectedOptions: [],
    },
    {
      label: "émissions directes des procédés hors énergie",
      dialogueOptions: [
        {
          label: "Process et émissions fugitives",
          value: "Process et émissions fugitives",
        },
      ],
      selectedOptions: [],
    },
    {
      label: "émissions directes fugitives",
      dialogueOptions: [
        {
          label: "Process et émissions fugitives",
          value: "Process et émissions fugitives",
        },
      ],
      selectedOptions: [],
    },
    {
      label: "émission issues de la biomasse (sols et forêts)",
      dialogueOptions: [{ label: "UTCF", value: "UTCF" }],
      selectedOptions: [],
    },
  ]);
  const [selectedEmissionIndex, setSelectedEmissionIndex] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleClickOpen = (index) => {
    setSelectedEmissionIndex(index);
    setOpenDialog(true);
    console.log("aaaa : ", index);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };
  /* const handleCheckboxChange = (optionLabel) => {
    setSelectedOptions((prevOptions) => [...prevOptions, optionLabel]);
  };*/
  const handleValider = () => {
    const updatedEmissionsList = [...emissionsList];
    updatedEmissionsList[selectedEmissionIndex].selectedOptions.push(
      ...selectedOptions
    );
    setEmissionsList(updatedEmissionsList);
    setSelectedOptions([]);
    setOpenDialog(false);
    setFe();
  };
  const SupprimerSelectedOption = (optionToRemove) => {
    console.log("Option à supprimer :", optionToRemove);
    console.log("Index de l'émission sélectionnée :", selectedEmissionIndex);
    const updatedEmissionsList = [...emissionsList];
    updatedEmissionsList[selectedEmissionIndex].selectedOptions =
      updatedEmissionsList[selectedEmissionIndex].selectedOptions.filter(
        (option) => option !== optionToRemove
      );
    setEmissionsList(updatedEmissionsList);
  };

  const [err, setError] = useState(null);
  const [data, setData] = useState("");
  const [category1, setCategory1] = useState("");
  const [category2, setCategory2] = useState("");
  const [category3, setCategory3] = useState("");
  const [nextLevelCategories, setnextLevelCategories] = useState([]);
  const [nextLevelCategories2, setnextLevelCategories2] = useState([]);
  const [fe, setFe] = useState();
  const handleCategory2 = async (event) => {
    try {
      setCategory1(event.target.value);
      const url = "http://localhost:3000/api/categories/nextCategories";
      const { data: res } = await axios.post(url, {
        userSelectedCategories: [event.target.value],
      });
      setnextLevelCategories(res.nextCategories);
      setData([category1]);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
      console.log(err);
    }
  };
  const handleCategory3 = async (event) => {
    try {
      setCategory2(event.target.value);
      const url = "http://localhost:3000/api/categories/nextCategories";
      const { data: res } = await axios.post(url, {
        userSelectedCategories: [category1, event.target.value],
      });
      setnextLevelCategories2(res.nextCategories);
      setFe(res.matchingDocuments);
      setData([category1, category2]);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
      console.log(err);
    }
  };
  const handleFe = async (event) => {
    try {
      setCategory3(event.target.value);
      const url = "http://localhost:3000/api/categories/nextCategories";
      const { data: res } = await axios.post(url, {
        userSelectedCategories: [category1, category2, event.target.value],
      });
      setFe(res.matchingDocuments);
      setData([category1, category2, category3]);
      console.log(fe);
      console.log(data);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
      console.log(err);
    }
  };
  return (
    <div>
      {emissionsList.map((emission, index) => (
        <Box key={index} p={2} bgcolor={"#F0F2F7"} mb={2} borderRadius={4}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={12} md={9}>
              <Typography variant="h6" gutterBottom style={Styles.contenuEtape}>
                {emission.label}
              </Typography>
            </Grid>
            <Grid item xs={12} md={3} sx={{ textAlign: "center" }}>
              <Button
                style={Styles.ajouterActiviteButton}
                onClick={() => handleClickOpen(index)}
              >
                <Typography style={Styles.ajouterText}>
                  Ajouter Activité
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={12} md={12}>
              {emission.selectedOptions &&
                emission.selectedOptions.length > 0 && (
                  <Grid style={{ marginTop: "15px" }}>
                    {emission.selectedOptions.map((option, optionIndex) => (
                      <Grid
                        container
                        sx={{
                          border: "1px solid black",
                          borderRadius: "15px",
                          marginBottom: "15px",
                          padding: "20px",
                          borderColor: "#6F6C8F",
                        }}
                        key={optionIndex}
                      >
                        <Grid item md={12}>
                          <Grid container>
                            <Grid
                              item
                              xs={12}
                              md={12}
                              sx={{
                                marginBottom: "15px",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Typography style={Styles.contenuEtape}>
                                {option.item}
                              </Typography>
                              <CroixIcon
                                onClick={() =>
                                  SupprimerSelectedOption(option.item)
                                }
                              />
                            </Grid>
                            <Grid
                              item
                              md={1.6}
                              xs={12}
                              container
                              alignItems="center"
                              style={{ marginTop: "-8px" }}
                            >
                              <Typography style={Styles.contenuEtape}>
                                Quantité :
                              </Typography>
                            </Grid>
                            <Grid item xs={12} md={10.4}>
                              <TextField
                                variant="outlined"
                                fullWidth
                                value={option.quantity}
                                sx={{
                                  borderRadius: "15px",
                                  mt: 1,
                                  mb: 2,
                                  "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#969696 !important",
                                    borderRadius: "15px",
                                  },
                                  "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#969696 !important",
                                    borderRadius: "15px",
                                  },
                                  "& .Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                      borderColor: "#969696 !important",
                                      borderRadius: "15px",
                                    },
                                }}
                                onChange={(e) => {
                                  const updatedEmissionsList = [
                                    ...emissionsList,
                                  ];
                                  updatedEmissionsList[
                                    selectedEmissionIndex
                                  ].selectedOptions[optionIndex].quantity =
                                    e.target.value;
                                  console.log(
                                    updatedEmissionsList[selectedEmissionIndex]
                                      .selectedOptions[optionIndex].item
                                  );
                                  console.log(
                                    updatedEmissionsList[selectedEmissionIndex]
                                      .selectedOptions[optionIndex].quantity
                                  );
                                  setEmissionsList(updatedEmissionsList);
                                }}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                )}
            </Grid>
          </Grid>
        </Box>
      ))}

      <Dialog
        open={openDialog}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        borderRadius={15}
        sx={{ borderRadius: "15px", fontFamily: "Inter, sans-serif" }}
      >
        <DialogContent sx={Styles.dialogContent}>
          <Grid
            container
            spacing={2}
            sx={{ paddingLeft: "16px", paddingRight: "16px" }}
          >
            {selectedEmissionIndex !== null && (
              <Grid item xs={12} md={12}>
                <Typography variant="h6" style={Styles.customTitle}>
                  Catégorie 1
                </Typography>
                <select
                  style={{ ...Styles.customSelect, width: "100%" }}
                  onChange={handleCategory2}
                >
                  <option disabled selected>
                    Selectionner une catégorie
                  </option>
                  {emissionsList[selectedEmissionIndex].dialogueOptions.map(
                    (option, index) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    )
                  )}
                </select>
              </Grid>
            )}
            <Grid item xs={12} md={12}>
              <Typography variant="h6" style={Styles.customTitle}>
                Catégorie 2
              </Typography>
              <select
                style={{ ...Styles.customSelect, width: "100%" }}
                onChange={handleCategory3}
              >
                <option disabled selected>
                  Selectionner une catégorie
                </option>
                {nextLevelCategories.map((index) => (
                  <option key={index} value={index}>
                    {index}
                  </option>
                ))}
              </select>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="h6" style={Styles.customTitle}>
                Catégorie 3
              </Typography>
              <select
                style={{ ...Styles.customSelect, width: "100%" }}
                onChange={handleFe}
              >
                <option disabled selected>
                  Selectionner une catégorie
                </option>
                {nextLevelCategories2.map((index) => (
                  <option key={index} value={index}>
                    {index}
                  </option>
                ))}
              </select>
            </Grid>
            <Grid item xs={12} md={12}>
              <Button style={Styles.rechercheButton}>
                <Typography style={Styles.rechercherText}>
                  Rechercher
                </Typography>
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              style={{ overflow: "auto", backgroundColor: "#F2F4F8" }}
            >
              <Paper
                style={{
                  height: "auto",
                  borderRadius: "15px",
                  padding: "20px",
                  backgroundColor: "#F2F4F8",
                }}
              >
                {fe &&
                  fe
                    .filter(
                      (item, index, self) =>
                        index ===
                        self.findIndex((t) => t.identifier === item.identifier)
                    )
                    .map((item, index) => {
                      if (
                        item.elementType === "Elément" ||
                        item.elementType === "Poste"
                      ) {
                        return (
                          <div key={index}>
                            <label>
                              <input
                                type="checkbox"
                                value={item}
                                // checked={selectedOption === item}
                                // onChange={() => setSelectedOption(item)}
                              />
                              {item.name + item.description}
                              {/* Display whatever property you want */}
                            </label>
                          </div>
                        );
                      }
                      return null; // Skip rendering if condition doesn't match
                    })}
              </Paper>
            </Grid>
            <Grid item xs={12} md={12}>
              <Grid container spacing={3}>
                <Grid item xs={6} md={6}>
                  <Button
                    variant="contained"
                    fullWidth
                    style={{ ...Styles.annulerButton }}
                  >
                    <Typography style={Styles.annulerText}>Annuler</Typography>
                  </Button>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Button
                    variant="contained"
                    fullWidth
                    style={{ ...Styles.validerButton }}
                    onClick={handleValider}
                  >
                    <Typography style={Styles.validerText}>Valider</Typography>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EmissionsDirectes;
