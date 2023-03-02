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
        stage ('Deploy-to-Node-Server'){
            steps {
                sshagent(['Node']){
                    sh 'npm --prefix /home/pablorechimon/PsiHouse/PsiHouse run dev'
                }
            }
        }
    }
}
