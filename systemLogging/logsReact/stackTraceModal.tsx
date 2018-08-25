import * as React from "react";
import * as moment from 'moment';

export const Modal = (props) => {
    return (
        <div className="modal fade" id="modals-stackTrace">
            <div className="modal-dialog modal-lg">
                <form className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Log</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">×</button>
                    </div>
                    <div className="modal-body">
                        <div className="form-row">
                            <div className="form-group col">
                                <p>
                                    <strong>{props.modalContent.title}</strong><br />
                                    {props.modalContent.message}<br />
                                    Created on: {moment(props.modalContent.dateCreated).format("MM-DD-YYYY")}<br />
                                    By: {props.modalContent.fullName}<br />
                                </p>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col mb-0">
                                <p>{props.stackTraceArray.map(itm => (itm))}</p>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </form>
            </div>
        </div>
    )
}