import * as React from "react";
//import { Stream } from "stream";
import axios from "axios";
import { ModalWindow } from "../modal";
import Dropzone from "react-dropzone";
import * as toastr from 'toastr';

export interface IFileUpload {
	onUploadComplete: (url: string) => void,
	buttonName?: string,
	drop?: boolean
}

interface IFileUploadState {
	open: boolean,
}

export class FileUpload extends React.Component<IFileUpload, IFileUploadState>
{
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			open: false,
		}
	}
	handleChange(selectorFiles: FileList, rejectedFiles: FileList = null) {
		let file = selectorFiles[0].name;
		var fileReader = new FileReader();
		var data;
		var onUploadComplete = (data) => {
			this.setState({ open: false }, () => {
				this.props.onUploadComplete(data);
			});
		};

		fileReader.onload = function (evt) {
			data = fileReader.result;  // data <-- in this var you have the file data in format (blob) that will be converted below to Base64 format?

			// encode file

			var arr = data.split(','), mime = arr[0].match(/:(.*?);/)[1],
				bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
			while (n--) {
				u8arr[n] = bstr.charCodeAt(n);
			}
			var newFile = new File([u8arr], selectorFiles[0].name, { type: mime });

			var formData = new FormData();

			formData.append("img", newFile);
			axios.post('/api/awsFileUpload', formData)
				.then(response => {
					onUploadComplete(response.data);
					toastr.success(`Successfully Uploaded ${file}`);
					//alert("Image Upload Complete.");
					//document.getElementById("uploadComplete").innerHTML = "Upload Complete."
					//if ($('p').hasClass('.resp')) {
					//	$('.resp').show().delay(3600).fadeOut(3600)
					//} else if ($('p').hasClass('.err')) {
					//	$('span').replaceWith(`<span className="resp"><strong>Successfully Uploaded ${file}</strong></span>`).delay(3600).fadeOut(3600)
					//} else {
					//	$(`<span className="resp"><strong>Successfully Uploaded ${file}</strong></span>`).appendTo('p').delay(3600).fadeOut(3600)
					//}
				})
				.catch(err => {
					console.error(err)
					toastr.error(`Unable to Upload ${file}`);
					//if ($('p').hasClass('.err')) {
					//	$('.err').show().delay(3600).fadeOut(3600)
					//} else if ($('p').hasClass('.resp')) {
					//	$('span').replaceWith(`<span className="resp"><strong>Unable to upload file type</strong></span>`).delay(3600).fadeOut(3600)
					//} else {
					//	$(`<span className="err"><strong>Unable to upload file type</strong></span>`).appendTo('p').delay(3600).fadeOut(3600)
					//}
				})
		};
		if (selectorFiles.length > 0) {
			fileReader.readAsDataURL(selectorFiles[0]);
		}
	}

	render() {
		return (
			<React.Fragment >
				{this.props.drop ?
					<React.Fragment>
						<button
							type="button"
							className="btn btn-primary waves-effect"
							onClick={() => this.setState({ open: true })}
						>
							{this.props.buttonName || "Upload"}
						</button>
						<ModalWindow
							showModal={this.state.open}
							onClose={() => this.setState({ open: false })}
							hideButton={true}
						>
							<h2>{this.props.buttonName || "Upload"}</h2>
							<Dropzone
								onDrop={this.handleChange}
								children={
									<div className="dz-message needsclick" >
										Drop file here or click to upload
								</div>
								}
								disablePreview={false}
								multiple={false}
								style={{
									position: "relative",
									borderWidth: "2px",
									borderColor: "gray",
									borderStyle: "dashed",
									borderRadius: "5px",
									height: "40vh"
								}}
								activeStyle={{
									position: "relative",
									borderWidth: "2px",
									borderColor: "#26B4FF",
									borderStyle: "solid",
									borderRadius: "5px",
									height: "40vh",
									backgroundColor: "#afafaf"
								}}
							/>
						</ModalWindow>
					</React.Fragment>
					:
					<React.Fragment>
						<label className="btn btn-outline btn-primary waves-effect" style={{ textOverflow: "ellipsis", maxWidth: "-webkit-fill-available" }}>
							<input
								hidden
								type="file"
								onChange={(e) => this.handleChange(e.target.files)} />
							{this.props.buttonName || "Upload"}
						</label>
					</React.Fragment>
				}
			</React.Fragment >
		)
	}
}