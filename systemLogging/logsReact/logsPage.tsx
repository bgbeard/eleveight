import * as React from "react";
import { LogApi } from "./logApi";
import { Tabs } from "../common/tabs";
import { LogForm } from "./logForm";
import { Button, Input, DropDownList } from "../common/form";
import { Modal } from "./stackTraceModal";

interface ILogInfo {
    appLog: any[]
    pageSize: number
    pageNumber: number
    appLogTypeId: number
    prevDisabled: boolean
    nextDisabled: boolean
    pageCount: number
    pageSizeOptions: any[]
    modalContent: any
    stackTraceArray: string[]
};

export default class LogsPage extends React.Component<{}, ILogInfo>{
    constructor(props) {
        super(props);
        this.state = {
            appLog: [],
            pageSize: 10,
            pageSizeOptions: [
                {
                    value: 10,
                    text: 10
                },
                {
                    value: 25,
                    text: 25
                },
                {
                    value: 50,
                    text: 50
                }
            ],

            pageNumber: 1,
            appLogTypeId: 1,
            prevDisabled: true,
            nextDisabled: false,
            pageCount: 1,
            modalContent: {
                title: "",
                message: "",
                dateCreated: "",
                stackTrace: "",
                fullName: ""
            },
            stackTraceArray: []
        }
    }

    componentDidMount() {
        document.title = "Eleveight - Logs"
        LogApi.GetLogs(this.state.pageSize, 1, this.state.appLogTypeId)
            .then(response => {
                this.setState({
                    appLog: response.items,
                    pageCount: response.items[0].pageCount
                });
            })
            .catch(err => console.error(err))
    }

    onClickPrev = () => {
        this.setState({
            pageNumber: this.state.pageNumber - 1
        }, () => {
            LogApi.GetLogs(this.state.pageSize, this.state.pageNumber, this.state.appLogTypeId)
                .then(response => {
                    this.setState({
                        appLog: response.items,
                        nextDisabled: false
                    });
                })
                .catch(err => console.error(err))
            if (this.state.pageNumber == 1) {
                this.setState({
                    prevDisabled: true
                })
            } else {
                this.setState({
                    prevDisabled: false
                })
            }
        })
    }

    onClickNext = () => {
        this.setState({
            pageNumber: this.state.pageNumber + 1
        }, () => {
            LogApi.GetLogs(this.state.pageSize, this.state.pageNumber, this.state.appLogTypeId)
                .then(response => {
                    this.setState({
                        appLog: response.items,
                        prevDisabled: false
                    });
                })
                .catch(err => console.error(err))
            if (this.state.pageNumber == this.state.pageCount) {
                this.setState({
                    nextDisabled: true
                })
            } else {
                this.setState({
                    nextDisabled: false
                })
            }
        })
    }

    onClickFirst = () => {
        this.setState({
            ...this.state,
            pageNumber: 1,
            prevDisabled: true,
            nextDisabled: false
        }, () => {
            LogApi.GetLogs(this.state.pageSize, this.state.pageNumber, this.state.appLogTypeId)
                .then(response => {
                    this.setState({
                        appLog: response.items
                    });
                })
                .catch(err => console.error(err))
        });
    }

    onClickLast = () => {
        this.setState({
            ...this.state,
            pageNumber: this.state.pageCount,
            prevDisabled: false,
            nextDisabled: true
        }, () => {
            LogApi.GetLogs(this.state.pageSize, this.state.pageNumber, this.state.appLogTypeId)
                .then(response => {
                    this.setState({
                        appLog: response.items
                    });
                })
                .catch(err => console.error(err))
        });
    }

    onChange = (fieldName, fieldValue) => {
        this.setState({
            ...this.state,
            [fieldName]: fieldValue
        }, () => {
            LogApi.GetLogs(this.state.pageSize, this.state.pageNumber, this.state.appLogTypeId)
                .then(response => {
                    this.setState({
                        appLog: response.items,
                        pageCount: response.items[0].pageCount
                    });
                })
                .catch(err => console.error(err))
        })
    }

    onClickShowStackTrace = (e) => {
        LogApi.GetLogById(e.target.id)
            .then(response => {
                if (response.item.stackTrace == null) response.item.stackTrace = " ";
                this.setState({
                    modalContent: response.item,
                    stackTraceArray: this.splitMessage(response.item.stackTrace)
                });
            })
            .catch(err => console.error(err))
    }

    splitMessage = item => {
        let newItem = item.split(" at ");
        return newItem;
    }

    onClickError = () => {
        this.setState({
            appLogTypeId: 1
        }, () => {
            LogApi.GetLogs(this.state.pageSize, this.state.pageNumber, this.state.appLogTypeId)
                .then(response => {
                    this.setState({
                        appLog: response.items,
                        pageCount: response.items[0].pageCount
                    });
                })
                .catch(err => console.error(err))
        })
    }

    onClickInfo = () => {
        this.setState({
            appLogTypeId: 2
        }, () => {
            LogApi.GetLogs(this.state.pageSize, this.state.pageNumber, this.state.appLogTypeId)
                .then(response => {
                    this.setState({
                        appLog: response.items,
                        pageCount: response.items[0].pageCount
                    });
                })
                .catch(err => console.error(err))
        })
    }

    render() {
        return (
            <React.Fragment>
                <LogForm
                    appLog={this.state.appLog}
                    onClickFirst={this.onClickFirst}
                    onClickPrev={this.onClickPrev}
                    onClickNext={this.onClickNext}
                    onClickLast={this.onClickLast}
                    prevDisabled={this.state.prevDisabled}
                    nextDisabled={this.state.nextDisabled}
                    onChange={this.onChange}
                    pageSizeOptions={this.state.pageSizeOptions}
                    pageSize={this.state.pageSize}
                    onClickShowStackTrace={this.onClickShowStackTrace}
                    onClickError={this.onClickError}
                    onClickInfo={this.onClickInfo}
                />
                <Modal
                    modalContent={this.state.modalContent}
                    stackTraceArray={this.state.stackTraceArray}
                />
            </React.Fragment>
        )
    }
}