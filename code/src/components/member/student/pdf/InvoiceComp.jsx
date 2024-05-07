import React from 'react'
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { useTranslation } from 'react-i18next'

Font.register({
    family: 'Regular',
    src: '/font/Poppins-Light.ttf'
});

Font.register({
    family: 'Medium',
    src: '/font/Poppins-Medium.ttf'
});

Font.register({
    family: 'Bold',
    src: '/font/Poppins-Bold.ttf'
});

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        fontFamily: 'Regular'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#f9f9f9',
        height: 63,
        fontFamily: 'Medium'
    },
    section: {
        margin: 10,
        flexGrow: 1
    },
    divider: {
        marginTop: 30,
        marginBottom: 30,
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#ededed',
        height: 2,
        width: '100%'
    },
    boxDetails: {
        rowGap: 20,
        flexDirection: 'column',
    },
    boxDiv: {
        padding: 25,
        backgroundColor: '#f9f9f9'
    },
    boxDescription: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5
    },
    boxTextHeading: {
        marginBottom: 17,
        fontSize: 16,
        fontFamily: 'Bold'
    },
    boxElement: {
        minWidth: '48%'
    },
    boxKey: {
        fontSize: 10,
        fontFamily: 'Bold'
    },
    boxValue: {
        fontSize: 9,
    },
    textTotal: {
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Medium'
    },
});

const InvoiceComp = (props) => {
    const { t } = useTranslation()

    const {
        date,
        customer_name,
        customer_email,
        customer_dob,
        customer_address,
        course_name,
        course_instructor_name,
        course_amount,
        transaction_id,
        transaction_created_at,
        transaction_updated_at,
        transaction_status
    } = props;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{import.meta.env.VITE_APP_NAME} {t('invoice')}</Text>
                    <Text style={{ fontWeight: 'thin', fontSize: 10, color: 'gray' }}>{date}</Text>
                </View>
                <View style={styles.section}>
                    <View style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <View style={styles.divider}></View>
                        <View style={styles.boxDetails}>
                            <View style={styles.boxDiv}>
                                <Text style={styles.boxTextHeading}>{t('customer')}</Text>
                                <View style={styles.boxDescription}>
                                    <View style={styles.boxElement}>
                                        <Text style={styles.boxKey}>{t('name')}</Text>
                                        <Text style={styles.boxValue}>{customer_name}</Text>
                                    </View>
                                    <View style={styles.boxElement}>
                                        <Text style={styles.boxKey}>{t('email')}</Text>
                                        <Text style={styles.boxValue}>{customer_email}</Text>
                                    </View>
                                    <View style={styles.boxElement}>
                                        <Text style={styles.boxKey}>{t('date-of-birth')}</Text>
                                        <Text style={styles.boxValue}>{customer_dob}</Text>
                                    </View>
                                    <View style={styles.boxElement}>
                                        <Text style={styles.boxKey}>{t('address')}</Text>
                                        <Text style={styles.boxValue}>{customer_address}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.boxDiv}>
                                <Text style={styles.boxTextHeading}>{t('course')}</Text>
                                <View style={styles.boxDescription}>
                                    <View style={styles.boxElement}>
                                        <Text style={styles.boxKey}>{t('name')}</Text>
                                        <Text style={styles.boxValue}>{course_name}</Text>
                                    </View>
                                    <View style={styles.boxElement}>
                                        <Text style={styles.boxKey}>{t('instructor')}</Text>
                                        <Text style={styles.boxValue}>{course_instructor_name}</Text>
                                    </View>
                                    <View style={styles.boxElement}>
                                        <Text style={styles.boxKey}>{t('amount')}</Text>
                                        <Text style={styles.boxValue}>{course_amount}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.boxDiv}>
                                <Text style={styles.boxTextHeading}>{t('transaction')}</Text>
                                <View style={styles.boxDescription}>
                                    <View style={styles.boxElement}>
                                        <Text style={styles.boxKey}>Id</Text>
                                        <Text style={styles.boxValue}>{transaction_id}</Text>
                                    </View>
                                    <View style={styles.boxElement}>
                                        <Text style={styles.boxKey}>{t('created-at')}</Text>
                                        <Text style={styles.boxValue}>{transaction_created_at}</Text>
                                    </View>
                                    <View style={styles.boxElement}>
                                        <Text style={styles.boxKey}>{t('paid-on-date')}</Text>
                                        <Text style={styles.boxValue}>{transaction_updated_at}</Text>
                                    </View>
                                    <View style={styles.boxElement}>
                                        <Text style={styles.boxKey}>Status</Text>
                                        <Text style={styles.boxValue}>{transaction_status}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.divider}></View>
                        <Text style={styles.textTotal}>Total : {course_amount}</Text>
                    </View>
                </View>
            </Page>
        </Document >
    )
}

export default InvoiceComp