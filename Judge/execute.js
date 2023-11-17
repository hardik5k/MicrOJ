const fs = require('fs');
const { exec } =require('child_process');

const DOCKERRUNCMD = 'docker run -v ' + __dirname +'/folderrun/:/home/folderrun/ -dt --memory="512m" --cpus="1"'
const IMAGE_NAME = 'ubuntu_judge'

function compareOutput(file1, file2) {

  const correct_ans = fs.readFileSync(file1, 'utf8').replace(/\s+/g, ' ').trim();
  const output_ans = fs.readFileSync(file2, 'utf8').replace(/\s+/g, ' ').trim();
  
  return correct_ans === output_ans

}

async function clearContainer(containerName){
  exec(`docker stop ${containerName}`)
  exec(`docker rm ${containerName}`)
}

function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error || stderr) {
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });
}

const run_submission = async (submissionID, containerName, timeOut, num_cases) => {
  let docker_run_cmd = `${DOCKERRUNCMD} --name ${containerName} ${IMAGE_NAME}`
  let program_compile_cmd =  `docker exec ${containerName} g++ /home/folderrun/${submissionID}.cpp -o /home/folderrun/${submissionID}.out`
  let execute_command = `/home/folderrun/${submissionID}.out `

  try {
    await executeCommand(docker_run_cmd);
  } catch (err){
    return -5;
  }

  try {
    await executeCommand(program_compile_cmd);
  } catch (err){
    return -1;
  }

  for (let i = 0; i < num_cases; i++){
    inputTCPath = "/home/folderrun/testcases/tc" + (i + 1).toString() + "i.txt";
    outputTCPath = "/home/folderrun/testcases/tc" + (i + 1).toString() + "o.txt";
    outputPath = '/home/folderrun/output/tc' + (i + 1).toString() + 'a.txt'
    input_cmd = execute_command + " < " + inputTCPath + " > " + outputPath;

    try {
      await executeCommand("docker exec " + containerName + ' /bin/sh -c "' + input_cmd + '"', { timeout: timeOut });
    } catch (err){
      return -2;
    }
    
  }
  clearContainer(containerName);
  for (let i = 0; i < num_cases; i++){
    outputTCPath = __dirname + "/folderrun/testcases/tc" + (i + 1).toString() + "o.txt";
    outputPath = __dirname + '/folderrun/output/tc' + (i + 1).toString() + 'a.txt'
    let result = compareOutput(outputTCPath, outputPath);

    if (result == false){
      return -3;
    }
  }
  return 1;
  

}

module.exports = { run_submission };
