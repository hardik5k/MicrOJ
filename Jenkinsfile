pipeline {
    agent any

    environment {
        FRONTEND_IMAGE_TAG = 'v1.0.0'
        SERVER_IMAGE_TAG = 'v1.0.0'
        JUDGE_IMAGE_TAG = 'v1.0.0'
    }

    stages {
        stage('Git Clone'){
        steps{
            git branch: 'main',
            url:'https://github.com/hardik5k/MicrOJ'
        }
    }

        stage('Build and Test Frontend') {
            steps {
                dir('frontend') {
                    script {
                        sh 'npm install && npm run build && npm run test'
                    }
                }
            }
        }

        stage('Build and Test Server') {
            steps {
                dir('Server') {
                    script {
                        sh 'npm install && npm test'
                    }
                }
            }
        }

        stage('Build and Test Judge') {
            steps {
                dir('Judge') {
                    script {
                        sh 'npm install && npm test'
                    }
                }
            }
        }

        stage('Build and Push Docker Images') {
            steps {

                dir('Server') {
                    script {
                        sh 'docker build -t microj_server:${SERVER_IMAGE_TAG} .'
                        sh 'docker push microj_server:${SERVER_IMAGE_TAG}'
                    }
                }

                dir('Judge') {
                    script {
                        sh 'docker build -t microj_judge:${JUDGE_IMAGE_TAG} .'
                        sh 'docker push microj_judge:${JUDGE_IMAGE_TAG}'
                    }
                }
            }
        }
    }
}
