import React, { useState } from "react";
import { Link } from "react-router-dom";
import Paper from '@mui/material/Paper';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRulerVertical, faWeight, faUserNinja } from '@fortawesome/free-solid-svg-icons'

function PokeCard(props) {
    const [showInfo, setShowInfo] = useState(false);
    const abilityList = props.abilities.map(item => {
        let str = item.ability.name;
        return str.charAt(0).toUpperCase() + str.slice(1);
    }).join(', ');

    const showTooltip = (event) => {
        if(event.target.offsetWidth >= event.target.scrollWidth) {
            event.target.removeAttribute('title');
        }
    };

  return (
    <Paper elevation={4}
        data-testid={props.testid}
        style={{padding: '1em 0.5em 1em 0.5em'}}>
          {props.name && (
              <span style={{display: 'flex', padding: '1em 0'}}>
                <span>
                    <Link to={{
                        pathname: "/pokemon",
                        state: props
                    }}>
                        <img style={{height: '7rem', cursor: 'pointer'}}
                            src={props.sprites.other['official-artwork']['front_default']}
                            alt={`${props.name}-img`} />
                    </Link>
                </span>
                <span style={{marginLeft: '1em', overflow: 'hidden'}}>
                    <div>
                        <Link
                            style={{textDecoration:'none', color: 'royalblue'}}
                            to={{
                                pathname: "/pokemon",
                                state: props
                            }}>
                            <span
                                style={{ cursor: 'pointer', fontWeight: '400', fontSize: '2rem', textTransform: "Capitalize" }}>
                                {props.name}
                            </span>
                        </Link>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <span style={{display: 'flex', padding:'0.25em 0', color: 'dimgray'}}>
                            <FontAwesomeIcon style={{width: '1em', marginRight: '0.5em'}} icon={faRulerVertical} />
                            <span>Height: {props.height}</span>
                        </span>
                        <span style={{display: 'flex', padding:'0.25em 0', color: 'dimgray'}}>
                            <FontAwesomeIcon style={{width: '1em', marginRight: '0.5em'}} icon={faWeight} />
                            <span>Weight: {props.weight}</span>
                        </span>
                        <div style={{display: 'flex', padding:'0.25em 0', color: 'dimgray'}}>
                            <FontAwesomeIcon style={{width: '1em', marginRight: '0.5em'}} icon={faUserNinja} />
                            <div title={abilityList}
                                onMouseEnter={showTooltip}
                                style={{textOverflow: 'ellipsis',overflow: 'hidden', whiteSpace: 'nowrap', paddingRight: '1em'}}>
                                    Abilities: {abilityList}
                            </div>
                        </div>
                    </div>
                </span>
              </span>
          )}
        </Paper>
  );
}

export default PokeCard;