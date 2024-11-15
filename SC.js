
const fs = require('fs');
let fetchedData;

async function initialize(filePath) {
    try {
      const rawData = fs.readFileSync(filePath, 'utf-8'); // Read the file
      jsonData = JSON.parse(rawData); // Parse JSON data
      console.clear()
      console.log('Verifying Update');
      checkUpdate(false,jsonData.version)
    } catch (error) {
      console.error('Error Occured While Initializing');
      console.log('Latest Update will be Installed')
      checkUpdate(true)
    }
  }

async function checkUpdate(autoupdate,version) {
  try {
    const response = await fetch('https://pastebin.com/raw/bmCBYxAj'); 
    latestData = await response.json();
    filePath = './detail.json';
    if (autoupdate==true){try {
        const RAWSC = await fetch(latestData.versionInfo.link) 
        const NewSC = await RAWSC.text()
        fs.writeFileSync('./SC.js',NewSC);
        console.clear()
        console.log("Source Code Update to : Vesion ",latestData.version)
        fs.writeFileSync('./detail.json', JSON.stringify(latestData, null, 2));
        console.clear()
        console.log(`Update Completed\n\nUpdate Notice:${latestData.versionInfo.updateNotice}`)
                
    } catch (error) {
        console.clear()
        console.log(`error occured while updating : `, error)
    }
    } else {
        if (version < latestData.version){
            console.log('Update Available Upto : Version',latestData.version)
            console.clear()
            console.log('Updating Now \n( Click Ctrl + C to Terminate )')
            try {
                const RAWSC = await fetch(latestData.versionInfo.link) 
                const NewSC = await RAWSC.text()
                fs.writeFileSync('./SC.js',NewSC);
                console.clear()
                console.log("Source Code Update to : Vesion ",latestData.version)
                fs.writeFileSync('./detail.json', JSON.stringify(latestData, null, 2));
                console.clear()
                console.log(`Update Completed\n\nUpdate Notice:${latestData.versionInfo.updateNotice}`)
                
            } catch (error) {
                console.clear()
                console.log(`error occured while updating : `, error)
            }




        } else {
          console.clear();
            console.log('No Updates Available');
            
            setTimeout(() => {
              console.clear();
          }, 2000);

        }
    }
  } catch (error) {
    console.error('Error Occured While Checking For Updates :' ,error);
  }
}
initialize("./detail.json")
console.log("Checking for Updates")


