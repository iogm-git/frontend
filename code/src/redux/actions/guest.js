import { fetchActions } from "@root/redux/actions"
import { fetchDataCourses, fetchDataCertificate } from "@root/services/guest"

export const coursesActions = fetchActions('COURSES', fetchDataCourses)
export const certificateActions = fetchActions('CERTIFICATE', fetchDataCertificate)