import * as React from "react";
import { Tabs, Tab } from "../common/tabs";
import { Card } from '../common/card';
import { Logs } from "./logs";
import { DropDownList } from "./dropDownList";
import { Button } from "../common/form";

export const LogForm = (props) => {
    const logsHeader = (
        <div>
            Logs

                <DropDownList
                label="Results per page: "
                name="pageSize"
                onChange={props.onChange}
                options={props.pageSizeOptions}
                selectedValue={props.pageSize}
            />

        </div>
    )

    return (
        <React.Fragment>
            <div className="container-fluid flex-grow-1 container-p-y">

                <Card header={logsHeader}>
                    <div className="btn-group">
                        <Button
                            label="Error"
                            onClick={props.onClickError}
                            className="btn btn-secondary"
                        />
                        <Button
                            label="Info"
                            onClick={props.onClickInfo}
                            className="btn btn-secondary"
                        />
                    </div>
                    <div className="card-body">
                        <Logs
                            appLog={props.appLog}
                            onClickFirst={props.onClickFirst}
                            onClickPrev={props.onClickPrev}
                            onClickNext={props.onClickNext}
                            onClickLast={props.onClickLast}
                            prevDisabled={props.prevDisabled}
                            nextDisabled={props.nextDisabled}
                            onChangePageSize={props.onChangePageSize}
                            onClickPageSize={props.onClickPageSize}
                            onClickShowStackTrace={props.onClickShowStackTrace}
                        />
                    </div>
                </Card>
            </div>
        </React.Fragment>
    )
}