pipeline {
    // tools {

    // }
    agent any
    stages {
        stage ('Initialize'){
            steps {
                sh '''
                    echo "PATH=${PATH}"
                    echo "Initializing Stage"
                '''
            }
        }
        stage ('Build'){
            steps {
                sh '''
                    echo "Build Stage"
                '''
            }
        }
    }
}