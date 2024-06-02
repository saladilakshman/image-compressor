import { useState, useEffect } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";
import { compressAccurately } from "image-conversion";
import { styles } from "./styles/style";
import {
  Container,
  Box,
  Divider,
  Stack,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Button,
  Slider,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShareIcon from "@mui/icons-material/Share";
import DownloadIcon from "@mui/icons-material/Download";
function App() {
  const theme = useTheme();
  const Mobile = useMediaQuery(theme.breakpoints.only("xs"));
  /**usefule tips to compress various image formats */
  const tips = [
    `1.Passport size photos:
       File size: 50 - 100 KB 
       Ideal for official documents and online forms.`,
    `2.High - quality images for printing:
       File size: 1 - 5 MB
       Suitable for high - resolution prints and professional publications.`,
    `3. Web images:
        File size: 100 - 500 KB
        Optimal for website usage, balancing quality with loading speed.`,
  ];

  /**Intial state values */
  const [compressionvalue, setCompressionvalue] = useState(5);
  const [actualImage, setActualImage] = useState("");
  const [compressedImage, setCompressedImage] = useState("");
  const [filetocompress, setFiletocompress] = useState({});
  const [fileSize, setFileSize] = useState({
    actualfilesize: null,
    compressedfilesize: 0,
    filename: null,
  });
  const [showcompressioncomponent, setShowcompressioncomponent] =
    useState(false);
  const [shareimage, setShareimage] = useState(null);
  const [disablebtn, setDisablebtn] = useState(true);
  const [compressbuttoninnertText, setCompressbuttoninnerText] =
    useState("compress");
  const [isclearqueued, setIsclearqueued] = useState(true);
  /**To check whether the file is empty as to show the component */
  useEffect(() => {
    if (actualImage === "") {
      setShowcompressioncomponent(false);
    } else {
      setShowcompressioncomponent(true);
    }
  }, [actualImage]);

  /**Toc check whether compressed image is null or not */
  useEffect(() => {
    if (compressedImage === "") {
      setDisablebtn(true);
    } else {
      setDisablebtn(false);
    }
  }, [compressedImage]);

  /**function to enalbe file selection */
  const filecompress = () => {
    let one_kb = 1024;
    const file_to_compress = document.getElementById("file-upload");
    const file = file_to_compress.files[0];
    const { size, name } = file;
    setActualImage(() => URL.createObjectURL(file));
    setFiletocompress(file);
    setFileSize((fileSize) => ({
      ...fileSize,
      actualfilesize: Math.floor(size / one_kb),
      filename: name,
    }));
  };
  /**async function to compress image based on user selection image */
  const compressImage = async () => {
    setCompressbuttoninnerText("compressing..");
    await compressAccurately(filetocompress, compressionvalue)
      .then((res) => {
        console.log(res);
        const filetoshare = new File([res], "image.png", { type: res.type });
        setShareimage(filetoshare);
        const compressedurl = URL.createObjectURL(res);
        setCompressedImage(compressedurl);
        setFileSize((prevState) => ({
          ...prevState,
          compressedfilesize: Math.floor(res.size / 1024),
        }));
        setCompressbuttoninnerText("compressed");
      })
      .catch((err) => console.log(err));
  };
  /**function to share the compressed image */
  const shareImage = async () => {
    const data = {
      files: [shareimage],
    };
    if (navigator.canShare && navigator.canShare(data)) {
      try {
        await navigator.share(data);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("webshare not supported");
    }
  };

  /**function to download image */
  const downloadImage = () => {
    const anchor = document.createElement("a");
    anchor.href = compressedImage;
    anchor.download = `imageoptipro-${fileSize.filename}`;
    document.body.appendChild(anchor);
    anchor.click();
  };

  /**function to clear the images file selection */
  const clearQueue = () => {
    setShowcompressioncomponent(false);
    setIsclearqueued(true);
    setActualImage("");
    setCompressedImage("");
    setFileSize({
      actualfilesize: null,
      compressedfilesize: 0,
      filename: null,
    });
  };

  useEffect(() => {
    if (actualImage === "" && compressedImage === "") {
      setIsclearqueued(true);
    } else {
      setIsclearqueued(false);
    }
  }, [actualImage, compressedImage, isclearqueued]);
  return (
    <Container
      sx={{
        paddingBlockStart: { xs: 5, lg: 12 },
        marginBlockEnd: 8,
      }}
    >
      <Typography
        variant={Mobile ? "h4" : "h3"}
        textAlign="center"
        sx={styles.App_logo}
      >
        Welcome to ImageOptiPro
      </Typography>
      <Typography
        variant={Mobile ? "body1" : "h5"}
        textAlign="center"
        sx={styles.App_info}
      >
        Effortlessly compress images for faster loading times and better user
        experience
      </Typography>
      <Box>
        <Accordion elevation={0} sx={styles.Accordion} disableGutters>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          >
            <Typography variant={Mobile ? "body1" : "h6"} sx={styles.tip}>
              Pro-tip : Click here to Explore useful tips for various file size
              compressions
            </Typography>
          </AccordionSummary>
          <Divider sx={styles.divider} />
          <AccordionDetails>
            {tips.map((tip, index) => {
              return (
                <Typography variant="body1" key={index} sx={styles.tip_text}>
                  {tip}
                </Typography>
              );
            })}
          </AccordionDetails>
        </Accordion>
      </Box>
      <Stack
        direction={"row"}
        justifyContent="center"
        alignItems="center"
        spacing={1.8}
        sx={{ marginBlockStart: 5 }}
      >
        <label htmlFor="file-upload">
          <Box
            component="input"
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={filecompress}
            style={{ display: "none" }} // Hide the default file input element
          />
          <Button component="span" variant="contained" size="large">
            choose image
          </Button>
        </label>
        <Button
          variant="contained"
          size="large"
          sx={styles.clearbutton}
          disabled={isclearqueued}
          onClick={clearQueue}
        >
          clear queue
        </Button>
      </Stack>
      {showcompressioncomponent && (
        <Stack
          direction={Mobile ? "column" : "row"}
          justifyContent="center"
          alignItems="center"
          spacing={Mobile ? 5 : 12}
          sx={{
            marginBlockStart: 12,
          }}
        >
          <Box className="actual-image">
            <Typography variant="h6">
              Actual Image Size: {fileSize.actualfilesize} KB
            </Typography>
            <Box component="div" sx={styles.image_component}>
              <Box
                component="img"
                alt=""
                src={actualImage}
                sx={styles.file_image}
              />
            </Box>
          </Box>
          <Box sx={styles.flex}>
            <Box>
              <Typography variant="body1">
                Choose file size to compress (in KB):
              </Typography>
              <br />
              <Slider
                color="success"
                value={compressionvalue}
                onChange={(event, newValue) => {
                  setCompressionvalue(newValue);
                }}
                valueLabelDisplay="auto"
                min={5}
                max={1000}
              />
            </Box>

            <Button
              variant="outlined"
              sx={styles.compress_button}
              onClick={compressImage}
            >
              {compressbuttoninnertText}
            </Button>
          </Box>
          <Box className="compressed-image">
            <Typography variant="h6">
              Compressed Image Size:{fileSize.compressedfilesize} KB
            </Typography>
            <Box
              component="div"
              sx={{ ...styles.image_component, position: "relative" }}
            >
              <Box
                component="img"
                alt=""
                src={compressedImage}
                sx={styles.file_image}
              />
              <Stack
                direction={{ xs: "row", lg: "column" }}
                justifyContent="center"
                alignItems="center"
                spacing={1.2}
                sx={styles.stack}
              >
                <IconButton
                  sx={styles.iconbutton}
                  onClick={shareImage}
                  size={Mobile ? "small" : "medium"}
                  disabled={disablebtn}
                >
                  <ShareIcon />
                </IconButton>
                <IconButton
                  sx={styles.iconbutton}
                  onClick={downloadImage}
                  size={Mobile ? "small" : "medium"}
                  disabled={disablebtn}
                >
                  <DownloadIcon />
                </IconButton>
              </Stack>
            </Box>
          </Box>
        </Stack>
      )}
    </Container>
  );
}

export default App;
