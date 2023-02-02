import authenticationRouteDocs from './authentication.doc';
import basicInfo from './basicInfo'
import welcomeRouteDocs from './welcome.docs'

export default {
    ...basicInfo,
    paths:{
        ...welcomeRouteDocs,
        ...authenticationRouteDocs
    }
};