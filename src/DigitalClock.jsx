import React,{useState,useEffect} from 'react'

function DigitalClock(){
    const [time,setTime]=useState(new Date());

    useEffect(()=>{
        // after every 1000ms time will update
        const intervalId=setInterval(()=>{
            setTime(new Date())
        },1000)

        return()=>{
            // to free resources by clearing timer
            // if we un mount our digital clock, we dont't want it to continue running
            clearInterval(intervalId)
        }
    },[]);
    // we need to start timer only when the component is mounted and not everytime when it renders


    function formatTime(){
        let hours=time.getHours();
        const minutes=time.getMinutes();
        const seconds=time.getSeconds();
        const meridiem= hours>=12 ? "PM": "AM";

        hours= hours%12 || 12;

        return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)} ${meridiem}`

    }

    function padZero(number){
        return (number<10 ? "0" :"")+number;
    }

    return(
        <div className='clock-container'>
            <div className='clock'>
                <span>{formatTime()}</span>
            </div>


        </div>
    )
}
export default DigitalClock;






// useEffect is used to perform side effects in the component.
// The useEffect hook here sets up an interval that updates the time state every second.
// setInterval calls the function setTime(new Date()) every 1000 milliseconds (1 second), which updates the time state with the current date and time.
// The return statement inside useEffect is a cleanup function that clears the interval when the component is unmounted, preventing memory leaks.


// Summary of the Cleanup Function in useEffect
// Purpose: The cleanup function in useEffect is used to clean up side effects when a component unmounts or before the effect is re-run due to changes in dependencies.
// When It's Called:
// Component Unmounts: Ensures that any ongoing side effects are terminated when the component is removed from the DOM.
// Dependencies Change: Runs before the effect function re-runs due to changes in dependencies specified in the dependency array.
// Common Use Cases:
// Clearing Intervals/Timeouts: Prevents intervals or timeouts from running indefinitely.
// Removing Event Listeners: Detaches event listeners to avoid memory leaks and unwanted behavior.
// Unsubscribing from Subscriptions: Ensures that subscriptions to data streams (e.g., WebSockets) are properly closed.
// Importance:
// Memory Management: Prevents memory leaks by releasing resources that are no longer needed.
// Avoiding Bugs: Ensures that state updates are not attempted on unmounted components.
// Resource Efficiency: Keeps the application performant by managing resource allocation effectively.
// Example
// Here's a simple example illustrating the cleanup function:

// javascript
// Copy code
// useEffect(() => {
//   const intervalId = setInterval(() => {
//     console.log('Interval running');
//   }, 1000);

//   return () => {
//     clearInterval(intervalId);
//   };
// }, []);


// Setup: An interval is created that logs a message every second.
// Cleanup: The interval is cleared when the component unmounts, preventing it from running indefinitely.
// Key Takeaway
// The cleanup function is crucial for managing side effects in React components, ensuring that resources are properly released when no longer needed,
//  thus maintaining optimal performance and preventing potential bugs.



// The Basics of useEffect
// The useEffect hook is designed to handle side effects in functional React components. Side effects can include operations like fetching data from an API,
//  manipulating the DOM, setting up subscriptions or intervals, and much more.

// The structure of useEffect looks like this:

// javascript
// Copy code
// useEffect(() => {
//   // Your side effect code here

//   return () => {
//     // Your cleanup code here
//   };
// }, [dependencies]);
// Side Effect Code: The primary code that runs when the component mounts or when any of the dependencies change.
// Cleanup Code: A function returned from the main function, which is executed when the component is about to unmount or before the side effect code runs again due to dependency changes.
// Detailed Explanation of the Cleanup Function
// 1. When is the Cleanup Function Called?
// Component Unmount: The cleanup function is called when the component is about to unmount, ensuring that any ongoing side effects are properly terminated.
// Dependency Change: If the useEffect has dependencies (i.e., the second argument is an array of variables), the cleanup function is called before the effect runs again due to changes in any of the dependencies.
// 2. Why is the Cleanup Function Important?
// Memory Management: It prevents memory leaks by cleaning up resources that are no longer needed, such as intervals, timeouts, subscriptions, or event listeners.
// Avoiding Bugs: It prevents potential bugs by ensuring that state updates are not attempted on unmounted components.
// Resource Efficiency: It ensures that resources like network connections, timers, or event listeners are properly disposed of when no longer needed.
// 3. Examples of Cleanup Scenarios
// Let's go through some common scenarios where cleanup functions are necessary.

// Interval or Timeout Cleanup
// When using setInterval or setTimeout, you need to clear them when the component unmounts:

// javascript
// Copy code
// useEffect(() => {
//   const intervalId = setInterval(() => {
//     console.log('Interval running');
//   }, 1000);

//   return () => {
//     clearInterval(intervalId);
//   };
// }, []);
// Event Listener Cleanup
// When adding event listeners, you should remove them in the cleanup function:

// javascript
// Copy code
// useEffect(() => {
//   const handleResize = () => {
//     console.log('Window resized');
//   };

//   window.addEventListener('resize', handleResize);

//   return () => {
//     window.removeEventListener('resize', handleResize);
//   };
// }, []);
// Subscription Cleanup
// When setting up subscriptions (e.g., to WebSockets or data streams), they should be unsubscribed in the cleanup function:

// javascript
// Copy code
// useEffect(() => {
//   const subscription = someDataStream.subscribe(data => {
//     console.log('Data received:', data);
//   });

//   return () => {
//     subscription.unsubscribe();
//   };
// }, []);
// How Cleanup Works Internally
// When useEffect is used, React performs the following steps:

// Component Mounts:

// The effect function runs.
// If the effect function returns a cleanup function, it is stored.
// Component Updates:

// Before running the effect function again (due to changes in dependencies), React runs the cleanup function from the previous effect.
// Component Unmounts:

// React runs the stored cleanup function to clean up any resources used by the effect.
// Example Walkthrough
// Here is a comprehensive example that uses an interval and demonstrates the cleanup process:

// javascript
// Copy code
// import React, { useState, useEffect } from 'react';

// function Clock() {
//   const [time, setTime] = useState(new Date());

//   useEffect(() => {
//     const tick = () => setTime(new Date());
//     const intervalId = setInterval(tick, 1000);

//     // Cleanup function to clear the interval
//     return () => {
//       clearInterval(intervalId);
//     };
//   }, []); // Empty dependency array means this effect runs only once

//   return <div>{time.toLocaleTimeString()}</div>;
// }

// export default Clock;
// Mounting:

// useEffect runs, setting up an interval to update the time every second.
// The cleanup function is registered to clear the interval.
// Unmounting:

// When the Clock component is about to unmount, React calls the cleanup function, which clears the interval, stopping the periodic updates.
// Conclusion
// The cleanup function in useEffect is essential for managing side effects in a React component. It ensures that any resources allocated by the side 
// effects are released properly when the component unmounts or when the effect dependencies change. This prevents memory leaks, avoids bugs, and keeps 
// the application efficient and performant.