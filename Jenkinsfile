pipeline
{
    environment
    {
        docker_image = ""
    }
    agent any
    stages
    {
        stage('Stage 1: Git Clone')
        {
            steps
            {
                git branch: 'main',
                url:'https://github.com/hardik5k/MicrOJ'
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'cd frontend && npm install && npm run build'
            }
        }
        stage('Build Frontend') {
            steps {
                sh 'cd frontend && npm install && npm run build'
            }
        }
        
    }
}