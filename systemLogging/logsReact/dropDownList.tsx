import * as React from "react";
import { ITextValue } from "../common/form/ITextValue";

export interface IDropDownListProps {
    name: string;
    label: string;
    selectedValue: any;
    options: ITextValue[];
    onChange: (key: string, value: string) => void;
    error?: string;
};

const onChangeInput = (props: IDropDownListProps) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.onChange(e.target.id, e.target.value);
}

export const DropDownList: React.StatelessComponent<IDropDownListProps> = (props) => {
    var options = props.options.map((option) => {
        return (
            <option key={option.value} value={option.value}>{option.text}</option>
        );
    })

    return (
        <div className="float-right" style={{ marginBottom: "-50px" }}>
            <label htmlFor={props.name}>{props.label}</label><span> </span>

            <select value={props.selectedValue} onChange={onChangeInput(props)} id={props.name}>{options}</select>

        </div>
    );
}