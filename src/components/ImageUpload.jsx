import { DropzoneArea, DropzoneDialog } from "material-ui-dropzone";
import {
  Box,
  Button,
  IconButton,
  ImageList,
  ImageListItem,
  Tooltip,
} from "@mui/material";
import React from "react";
import { useState } from "react";

// import { createStyles, makeStyles } from '@material-ui/core/styles';

// icons
import DeleteIcon from "@mui/icons-material/Delete";

const ImageUpload = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedImages, setSelectedImages] = useState([]);

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));

    // FOR BUG IN CHROME
    event.target.value = "";
  };

  const handleDelete = (image) => {
    setSelectedImages(selectedImages.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  };

  const handleClick = () => {};

  const handleSave = () => {};

  const handleClose = () => {};

  const handleOpen = () => {};

  // const useStyles = makeStyles(theme => createStyles({
  //   previewChip: {
  //     minWidth: 160,
  //     maxWidth: 210
  //   },
  // }));

  // const classes = useStyles();

  return (
    <Box sx={{ width: "500px" }}>
      <DropzoneArea
        showPreviews={true}
        showPreviewsInDropzone={true}
        // useChipsForPreview
        dropzoneClass="my-custom-class"
        showAlerts={true}
        // previewGridProps={{ container: { spacing: 1, direction: "row" } }}
        // previewChipProps={{ classes: { root: classes.previewChip } }}
        previewText="Selected files"
      />
    </Box>
    // <section>
    //   {/* <div>
    //     <Button onClick={() => handleOpen()}>Add Image</Button>
    //     <DropzoneDialog
    //       open={isOpen}
    //       onSave={() => handleSave()}
    //       acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
    //       showPreviews={true}
    //       maxFileSize={5000000}
    //       onClose={() => handleClose()}
    //     />
    //   </div> */}

    //   {/* <DropzoneArea
    //     acceptedFiles={['image/*']}
    //     dropzoneText={"Drag and drop an image here or click"}
    //     onChange={(files) => console.log('Files:', files)}
    //   /> */}

    //   {/* <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
    //     {selectedImages.length &&
    //       selectedImages.map((image) => (
    //         <Tooltip
    //           title={
    //             <IconButton onClick={() => handleDelete(image)}>
    //               <DeleteIcon />
    //             </IconButton>
    //           }
    //         >
    //           <ImageListItem key={image}>
    //             <img src={image} alt="" />
    //           </ImageListItem>
    //         </Tooltip>
    //       ))}
    //   </ImageList> */}

    //   {/* {selectedImages.length > 0 &&
    //     (selectedImages.length > 10 ? (
    //       <p className="error">
    //         You can't upload more than 10 images! <br />
    //         <span>
    //           please delete <b> {selectedImages.length - 10} </b> of them{" "}
    //         </span>
    //       </p>
    //     ) : (
    //       <button
    //         className="upload-btn"
    //         onClick={() => {
    //           console.log(selectedImages);
    //         }}
    //       >
    //         UPLOAD {selectedImages.length} IMAGE
    //         {selectedImages.length === 1 ? "" : "S"}
    //       </button>
    //     ))} */}

    //   {/* <div className="images">
    //     {selectedImages &&
    //       selectedImages.map((image, index) => {
    //         return (
    //           <div key={image} className="image">
    //             <img src={image} height="200" alt="upload" />
    //             <button onClick={() => deleteHandler(image)}>
    //               delete image
    //             </button>
    //             <p>{index + 1}</p>
    //           </div>
    //         );
    //       })}
    //   </div> */}
    // </section>
  );
};

export default ImageUpload;
