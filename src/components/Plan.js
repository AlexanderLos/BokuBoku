import '../css/plan.css';
import PlanOne from '../images/PlanOne.png';
import PlanTwo from '../images/PlanTwo.png';
import PlanThree from '../images/PlanThree.png';
import PlanFour from '../images/PlanFour.png';
import PlanFive from '../images/PlanFive.png';

const Plan = () => {
    return (
        <>
            <div className='ContainerOnePlan'>
                {/* Uncomment and use these divs if needed */}
                {/* <div className='EverythingBox'><h1>EVERYTHING ABOUT</h1></div>
                <div className='BokuLabsBox'><h1>BOKU LABS</h1></div>
                <div className='OurJourneyBox'><h1>OUR JOURNEY</h1></div> */}
            </div>
            <div className='BackgroundImageAbout'>
                <div className='ContainerTwoPlan'>
                    <div className='PlanObject PlanObjectOne'>
                        <div className='SubBox SubBoxOne'>
                            <div className='Image1'>
                                <img src={PlanOne} alt="Plan One" />
                            </div>
                            <div className='Text'>METAVERSE</div>
                            <div className='Button'>FIND OUT MORE</div>
                        </div>
                    </div>
                    <div className='PlanObject PlanObjectTwo'>
                        <div className='SubBox SubBoxTwo'>
                            <div className='Image2'>
                                <img src={PlanTwo} alt="Plan Two" />
                            </div>
                            <div className='Text'>GAME</div>
                            <div className='Button'>FIND OUT MORE</div>
                        </div>
                    </div>
                    <div className='PlanObject PlanObjectThree'>
                        <div className='SubBox SubBoxThree'>
                            <div className='Image3'>
                                <img src={PlanThree} alt="Plan Three" />
                            </div>
                            <div className='Text'>MERCH</div>
                            <div className='Button'>FIND OUT MORE</div>
                        </div>
                    </div>
                    <div className='PlanObject PlanObjectFour'>
                        <div className='SubBox SubBoxFour'>
                            <div className='Image4'>
                                <img src={PlanFour} alt="Plan Four" />
                            </div>
                            <div className='Text'>BEER</div>
                            <div className='Button'>FIND OUT MORE</div>
                        </div>
                    </div>
                    <div className='PlanObject PlanObjectFive'>
                        <div className='SubBox SubBoxFive'>
                            <div className='Image5'>
                                <img src={PlanFive} alt="Plan Five" />
                            </div>
                            <div className='Text'>ONI DRAGZ</div>
                            <div className='Button'>FIND OUT MORE</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Plan;
