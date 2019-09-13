import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setState } from '../store/actions'
import Camera from 'react-html5-camera-photo'
import 'react-html5-camera-photo/build/css/index.css'
 
export default () => {

    const photo = useSelector(state => state.photo)
    const dispatch = useDispatch()


    const onTakePhoto = (dataUri) => {
        dispatch(setState('photo', dataUri))
      }

    return (
        <div className="App">
            {photo ?
            <div className="player">
                <img className="face-player" src={photo} />
                <img className="robot-player" src="images/robot.png" />
            </div> :
            <div className="camera">
                <Camera
                onTakePhoto = { (dataUri) => { onTakePhoto(dataUri) } }
                />
                <img className="robot" src="images/robot.png" />
            </div>}
        </div>
    )
}