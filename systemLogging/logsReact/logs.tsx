import * as React from "react";
import apiExecute from "../common/apiExecute";
import { LogApi } from "./logApi";
import { Button } from "../common/form";
import { Input } from "../common/form/input";
import * as moment from 'moment';

export const Logs = (props) => {
    const listItems = props.appLog.map((itm) => {
        return (
            <tr key={itm.id}>
                <td className="text-left">{itm.title}</td>
                <td className="text-left">{itm.message}</td>
                <td>{moment(itm.dateCreated).format("MM-DD-YYYY")}</td>
                <td>{itm.fullName}</td>
                <td><button id={itm.id} type="button" className="btn btn-primary" data-toggle="modal" data-target="#modals-stackTrace" onClick={props.onClickShowStackTrace}>Show Stack Trace</button></td>
            </tr >
        )
    })

    return (
        <React.Fragment>
            <div className="table table-responsive">
                <table className="table table-striped table-bordered dataTable no-footer table-responsive">
                    <thead>
                        <tr className="text-center">
                            <th>Title</th>
                            <th>Message</th>
                            <th style={{ width: "120px" }}>Date</th>
                            <th>Name</th>
                            <th>Stack Trace</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listItems}
                    </tbody>
                </table>
                <Button
                    label="FIRST"
                    className="btn btn-secondary"
                    onClick={props.onClickFirst}
                    disabled={props.prevDisabled}
                />
                <Button
                    label="PREV"
                    className="btn btn-secondary"
                    onClick={props.onClickPrev}
                    disabled={props.prevDisabled}
                />
                <Button
                    label="NEXT"
                    className="btn btn-secondary"
                    onClick={props.onClickNext}
                    disabled={props.nextDisabled}
                />
                <Button
                    label="LAST"
                    className="btn btn-secondary"
                    onClick={props.onClickLast}
                    disabled={props.nextDisabled}
                />
            </div>
        </React.Fragment>
    )
}