import styled from 'styled-components';
import React, { useEffect } from 'react';
import githubIcon from '../images/github.png';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { dark, atomDark, dracula, coldDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { nord } from "react-syntax-highlighter/dist/esm/styles/prism";
import MonacoEditor from 'react-monaco-editor';
import api from '../Api.js';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './Main.css';

const Page = styled.div`
    display: flex;
    flex-direction: column;
    font-family: monospace;
`;

const Header = styled.div`
    background-color: #252525;
    height: 60px;
    box-shadow: 0px 10px 8px 0px rgb(0 0 0 / 75%);
    z-index: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 1.5vh;
`;

const Body = styled.div`
    background-color: #252525;
    width: 100vw;
    height: calc(100vh - 60px);
    display: flex;
    flex-direction: row;
    @media (max-width: 48em) {
        flex-direction: column;
    }
`;

const Logo = styled.p`
    color: orange;
    font-size: 3vh;
`;

const Actions = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const SettingsToggleBtn = styled.div`
    margin-right: 30px;
    margin-left: 10px;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 5px;
    padding-bottom: 5px;
    background-color: #38373d;
    box-shadow: 0px 5px 4px 0px rgb(0 0 0 / 75%);
    color: #fff;
    font-size: 1.2em;
    cursor: pointer;
`;

const GithubIcon = styled.div`
    background-image: url(${githubIcon});
    background-size: contain;
    height: 16px;
    width: 16px;
    margin-right: 5px;
`;

const GithubLinks = styled.div`
    display: flex;
    flex-direction: column;
`;

const GithubLink = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Link = styled.a`
    color: #fff;
    text-decoration: none;
    line-height: 1.4;
    font-size: 1.3em;
    font-weight: bold;
    &:hover {
        color: orange;
    }
`;

const RootObjectArea = styled.div`
    display: flex;
    flex-direction: column;
    & > label {
        color: #fff;
        font-size: 1.3em;
    }
    & > input {
        color: #bebdc5;
        width: 35%;
        background-color: #38373d;
        border: #38373d;
        padding: 4px;
    }
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2vh 0.7vw;
    box-sizing: border-box;
    width: calc(55vw - 4px);
    & > ${RootObjectArea} {
        margin-bottom: 0vh;
    }

    @media (max-width: 48em) {
        width: 100%;
        height: 50%;
        padding: 1vh 0.7vw;
    }
`;
const OutputArea = styled.div`
    padding: 2vh 0.7vw;
    box-sizing: border-box;
    width: calc(45vw - 4px);
    color: red !important;

    @media (max-width: 48em) {
        width: 100%;
        height: 50%;
        padding: 1vh 0.7vw;
    }
`;

const DragBar = styled.div`
    width: 8px;
    background-color: orange;

    @media (max-width: 48em) {
        display: none;
    }
`;

const Settings = styled.div`
    z-index: 1;
    width: 180px;
    top: 60px;
    right: 0;
    position: absolute;
    margin: 20px;
    background-color: orange;
    display: ${props => props.show ? 'flex' : 'none'};
    flex-direction: column;
    padding: 20px;
    color: #000;
    box-shadow: -4px 10px 8px 0px rgb(0 0 0 / 75%);
    & > label {
        font-size: 1.1em;
    }
`;

export default function Main() {
    const initInput = `{
    "Welcome": "Json2FSharp"
}`;
    const collectionGenerationOptions = [
        { value: "List", label: "List" },
        { value: "Array", label: "Array" },
        { value: "Sequence", label: "Sequence" },
        { value: "CharpList", label: "List<T>" },
    ];
    const outputFeaturesOptions = [
        { value: "JustTypes", label: "Just Types" },
        { value: "NewtosoftAttributes", label: "Newtonsoft" }
    ];
    const [collectionGeneration, setCollectionGeneration] = React.useState(collectionGenerationOptions[0]);
    const [outputFeature, setOutputFeature] = React.useState(outputFeaturesOptions[0]);

    const [rootObjectName, setRootObjectName] = React.useState("Root");
    const [input, setInput] = React.useState(initInput);
    const [output, setOutput] = React.useState("");
    const [isError, setIsError] = React.useState(false);
    const [showSettings, setShowSettings] = React.useState(true);

    useEffect(() => {
        generate(input, collectionGeneration, outputFeature, rootObjectName);
    }, [input, collectionGeneration, outputFeature, rootObjectName]);

    const options = {
        selectOnLineNumbers: true,
        renderSideBySide: false,
        roundedSelection: false,
    };

    async function generate(input, collectionGeneration, outputFeature, rootObjectName) {
        let response = await api.generate(input, collectionGeneration.value, rootObjectName, outputFeature.value);
        setInput(input);
        setOutput(response.data);
        setIsError(response.ok !== "Ok");
    }

    function onChange(data, e) {
        setInput(data);
    }

    return (
        <Page>
            <Header>
                <Logo>Json2Fsharp</Logo>
                <Actions>
                    <SettingsToggleBtn onClick={() => setShowSettings(!showSettings)}>{showSettings ? 'Hide' : 'Show'}</SettingsToggleBtn>
                    <GithubLinks>
                        <GithubLink>
                            <GithubIcon />
                            <Link href="https://github.com/Mefgalm/json2fsharp-front" target="_blank">front</Link>
                        </GithubLink>
                        <GithubLink>
                            <GithubIcon />
                            <Link href="https://github.com/Mefgalm/Json2FSharpBack" target="_blank">back</Link>
                        </GithubLink>
                    </GithubLinks>
                </Actions>
            </Header>
            <Body>
                <InputArea>
                    <RootObjectArea>
                        <label>Root Object</label>
                        <input value={rootObjectName} onChange={e => setRootObjectName(e.target.value)}></input>
                    </RootObjectArea>
                    <div style={{ marginTop: '1vh', height: '100vh' }}>
                        <MonacoEditor
                            language="json"
                            theme="vs-dark"
                            value={input}
                            options={options}
                            onChange={onChange}
                        />
                    </div>

                </InputArea>
                <DragBar></DragBar>
                <OutputArea>
                    <MonacoEditor
                        language="fsharp"
                        theme="vs-dark"
                        value={output}
                        options={options}
                    //onChange={onChange}
                    />
                </OutputArea>
                <Settings show={showSettings}>
                    <label>
                        Collection generation
                    </label>
                    <Dropdown
                        controlClassName='dropdown-menu-item'
                        menuClassName='dropdown-menu-item'
                        onChange={setCollectionGeneration}
                        options={collectionGenerationOptions}
                        value={collectionGeneration} />
                    <label>
                        Output features
                    </label>
                    <Dropdown
                        controlClassName='dropdown-menu-item'
                        menuClassName='dropdown-menu-item'
                        onChange={setOutputFeature}
                        options={outputFeaturesOptions}
                        value={outputFeature} />
                </Settings>
            </Body>
        </Page>
    );
}