import DashboardController from './DashboardController'
import DomainController from './DomainController'
import DomainCheckController from './DomainCheckController'
import Settings from './Settings'

const Controllers = {
    DashboardController: Object.assign(DashboardController, DashboardController),
    DomainController: Object.assign(DomainController, DomainController),
    DomainCheckController: Object.assign(DomainCheckController, DomainCheckController),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers