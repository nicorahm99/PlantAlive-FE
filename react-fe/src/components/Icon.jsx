import React from 'react';
import logo from '../assets/Plantalive_logo.svg'
import AccountCircle from '@material-ui/icons/AccountCircle';
import Lock from '@material-ui/icons/Lock';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export default function Icon(props) {
    return (
            <div className={props.className}>
                {getSVG()}
            </div>
        )

    function getSVG() {
        switch (props.iconName) {
            case "floppy":
                return (<svg height="403pt" viewBox="-6 0 403 403.00001" width="403pt" xmlns="http://www.w3.org/2000/svg"><path d="m79.640625 279.027344h231v123.972656h-231zm0 0" /><path d="m260.640625 10c-.007813-5.519531-4.480469-9.9921875-10-10h-141c-5.523437.0078125-9.996094 4.480469-10 10v99.945312h161zm0 0" /><path d="m280.640625 18.582031v101.363281c0 5.523438-4.480469 10-10 10h-181c-5.523437 0-10-4.476562-10-10v-101.363281h-49.640625c-16.5625.019531-29.9804688 13.441407-30 30v324.417969c.0195312 16.5625 13.4375 29.980469 30 30h29.640625v-133.972656c0-5.523438 4.476563-10 10-10h251c5.519531 0 10 4.476562 10 10v133.972656h29.636719c16.5625-.019531 29.980468-13.4375 30-30v-255.152344l-82.738282-99.265625zm0 0" /></svg>);
            case "key":
                return (<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512.002 512.002" space="preserve"> <g> <g> <circle cx="364" cy="140.062" r="32" /> </g> </g> <g> <g> <path d="M506.478,165.937c-10.68-27.194-30.264-66.431-62.915-98.927c-32.535-32.384-71.356-51.408-98.194-61.666 c-29.464-11.261-62.945-4.163-85.295,18.082l-78.538,78.17c-23.281,23.171-29.991,58.825-16.698,88.72 c4.122,9.272,8.605,18.341,13.395,27.103L5.858,389.793C2.107,393.544,0,398.631,0,403.936v88c0,11.046,8.954,20,20,20h88 c11.046,0,20-8.954,20-20v-36l36-0.001c11.046,0,20-8.954,20-20v-35.999h36c11.046,0,20-8.954,20-20c0-11.046-8.954-20-20-20h-56 c-11.046,0-20,8.954-20,20v35.999l-36,0.001c-11.046,0-20,8.954-20,20v36H40V412.22l177.355-177.354 c6.516-6.516,7.737-16.639,2.958-24.517c-6.931-11.424-13.298-23.632-18.923-36.285c-6.599-14.841-3.237-32.57,8.366-44.119 l78.537-78.169c11.213-11.159,28.011-14.718,42.798-9.068c23.222,8.876,56.69,25.214,84.256,52.652 c27.735,27.604,44.62,61.567,53.9,85.197c5.791,14.748,2.272,31.503-8.965,42.687l-79.486,79.114 c-11.575,11.519-28.851,14.887-44.016,8.58c-12.507-5.202-24.62-11.382-36-18.367c-9.413-5.778-21.729-2.83-27.507,6.584 c-5.778,9.414-2.831,21.73,6.583,27.508c13.152,8.072,27.136,15.207,41.562,21.207c30.142,12.539,64.525,5.8,87.595-17.161 l79.486-79.113C511.044,229.157,518.101,195.534,506.478,165.937z" /> </g> </g></svg>);
            case "mail":
                return (<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512 512"> <g> <g> <path d="M467,76H45C20.137,76,0,96.262,0,121v270c0,24.885,20.285,45,45,45h422c24.655,0,45-20.03,45-45V121 C512,96.306,491.943,76,467,76z M460.698,106c-9.194,9.145-167.415,166.533-172.878,171.967c-8.5,8.5-19.8,13.18-31.82,13.18 s-23.32-4.681-31.848-13.208C220.478,274.284,64.003,118.634,51.302,106H460.698z M30,384.894V127.125L159.638,256.08L30,384.894z M51.321,406l129.587-128.763l22.059,21.943c14.166,14.166,33,21.967,53.033,21.967c20.033,0,38.867-7.801,53.005-21.939 l22.087-21.971L460.679,406H51.321z M482,384.894L352.362,256.08L482,127.125V384.894z" /> </g> </g></svg>);
            case "draw":
                return (<svg width="135.45mm" height="101.62mm" version="1.1" viewBox="0 0 135.45 101.62" xmlns="http://www.w3.org/2000/svg"> <g transform="translate(0 -48.38)" display="none"> <image x="7.4083" y="3.95" width="135.47" height="135.47" image-rendering="optimizeSpeed" preserveAspectRatio="none" /> </g> <g transform="translate(0,-195.38)"> <rect x="-6.1989e-6" y="195.39" width="135.47" height="16.939" ry="8.4697" /> <rect x="4.7684e-6" y="237.73" width="135.47" height="16.939" ry="8.4697" /> <rect y="280.06" width="135.47" height="16.939" ry="8.4697" /> </g> </svg>);
            case "close":
                return (<svg width="101.69mm" height="101.62mm" version="1.1" viewBox="0 0 101.69 101.62" xmlns="http://www.w3.org/2000/svg"> <g transform="translate(0 -48.38)" display="none"> <image x="7.4083" y="3.95" width="135.47" height="135.47" image-rendering="optimizeSpeed" preserveAspectRatio="none" /> </g> <g transform="translate(0,-195.38)"> <rect transform="rotate(45)" x="142.27" y="129.84" width="135.47" height="16.939" ry="8.4697" /> <rect transform="rotate(-45)" x="-206.08" y="201.49" width="135.47" height="16.939" ry="8.4697" /> </g> </svg>);
            case "back":
                return (<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 240.823 240.823" style="enable-background:new 0 0 240.823 240.823;"> <g> <path id="Chevron_Right" d="M57.633,129.007L165.93,237.268c4.752,4.74,12.451,4.74,17.215,0c4.752-4.74,4.752-12.439,0-17.179 l-99.707-99.671l99.695-99.671c4.752-4.74,4.752-12.439,0-17.191c-4.752-4.74-12.463-4.74-17.215,0L57.621,111.816 C52.942,116.507,52.942,124.327,57.633,129.007z" /> </g> </svg>);
            case "LOGO": 
                return (<img src={logo} alt="Logo" />);
            case "account":
                return (<AccountCircle />)
            case "password":
                return (<Lock />)
            case "visibility":
                return (<Visibility />)
            case "visibilityOff":
                return (<VisibilityOff />)
        }
    }
}