import { FieldValue } from "firebase-admin/firestore"
import { NextResponse } from "next/server"
import { getAdminDb } from "../../../../lib/firebase-admin"

// POST - Seed speaker data from Excel import into Firestore
export async function POST() {
    try {
        const db = getAdminDb()
        const batch = db.batch()

        const speakers = [
            {
                name: "Dr. Paul Biddinger",
                title: "Chief Preparedness and Continuity Officer",
                organization: "MassGeneralBrigham",
                bio: "Dr. Paul Biddinger is the Chief Preparedness and Continuity Officer at Mass General Brigham (MGB) and the Chief of the Division of Emergency Preparedness in the Department of Emergency Medicine at MGB. He holds the Ann L. Prestipino MPH Endowed Chair in Emergency Preparedness and is also the Director of the Center for Disaster Medicine at Massachusetts General Hospital (MGH). Dr. Biddinger additionally serves as the Director of the Emergency Preparedness Research, Evaluation and Practice (EPREP) Program at the Harvard T. H. Chan School of Public Health and holds appointments at Harvard Medical School and at the Chan School.\n\nDr. Biddinger serves as a medical officer for the MA-1 Disaster Medical Assistance Team (DMAT) in the National Disaster Medical System (NDMS) in the US Department of Health and Human Services (HHS). Dr. Biddinger is an active researcher in the field of emergency preparedness and has lectured nationally and internationally on topics of preparedness and disaster medicine. He has authored numerous articles and book chapters on multiple topics related to disaster medicine and emergency medical operations and has responded to numerous prior disaster events, including Hurricane Katrina, Superstorm Sandy, the Boston Marathon bombings, the Nepal earthquakes, and many others.\n\nHe completed his undergraduate study in international relations at Princeton University, attended medical school at Vanderbilt University, and completed residency training in emergency medicine at Harvard.",
                imageUrl: "",
                linkedIn: "",
                order: 1,
                featured: true,
            },
            {
                name: "Dr. Sean Biggerstaff",
                title: "Deputy Director, Research & Engineering Directorate",
                organization: "Defense Health Agency",
                bio: "Dr. Sean Biggerstaff is the Deputy Director for the Research & Engineering Directorate, Defense Health Agency (DHA), Defense Health Headquarters, Falls Church, VA. He leads a professional team that works to advance collaborative, innovative medical research, and development to improve military community health and save lives on and off the battlefield.\n\nThe directorate supports the Office of the Assistant Secretary of Defense for Health Affairs (ASD(HA)) in the oversight, management and execution of the Defense Health Program's Research, Development, Testing and Evaluation (RDT&E) program. The program funds science and technology and advanced development efforts to deliver material and knowledge products to the Joint force. The program investments include research in Combat Casualty Care, Military Operational Medicine, Regenerative Medicine and Rehabilitation, and Infectious Diseases.\n\nPrior to his role as the Deputy R&E Director, Dr. Biggerstaff served 24 years on active duty as an Aerospace Experimental Psychologist in the U.S. Navy Medical Service Corps. Half of his career was spent working in biomedical research and research management, the other half working on human systems research, engineering, and program management.",
                imageUrl: "",
                linkedIn: "",
                order: 2,
                featured: false,
            },
            {
                name: "Rene Dominguez",
                title: "President & CEO",
                organization: "VelocityTX",
                bio: "Rene Dominguez is President and Chief Operating Officer (COO) of the Texas Research and Technology Foundation (TRTF), a leading non-profit economic development organization established in 1984, and its subsidiary VelocityTX. TRTF strongly champions the long-term community goal of supporting commercialization and entrepreneurial development, strengthening and supporting our military missions, and serving as a driver of the life sciences innovation ecosystem in San Antonio.\n\nPrior to his position with TRTF, Dominguez was appointed Director of the International and Economic Development Department for the City of San Antonio. For a decade, Dominguez was responsible for the implementation of the City of Antonio's economic development strategy including the Industry Development, Small Business, Workforce, and International Development Divisions.\n\nDominguez came to the City from the Community Development Loan Fund (CDLF), a certified Community Development Financial Institution (CDFI), where he was President and CEO promoting economic development and small business growth. Before that, he worked at St. Mary's University in various positions, ending his tenure as Executive Director of Development.",
                imageUrl: "",
                linkedIn: "",
                order: 3,
                featured: false,
            },
            {
                name: "Taylor Eighmy",
                title: "President",
                organization: "The University of Texas at San Antonio",
                bio: "Taylor Eighmy is the 6th president of The University of Texas at San Antonio (UTSA). Eighmy is passionate about the critical role that research universities play in creating and applying knowledge to improve the world. He believes deeply in higher education as a great opportunity provider, especially when grounded in student success.\n\nSince arriving at UTSA, Eighmy has made great strides toward linking educational attainment to San Antonio's economic development. Under his leadership, UTSA is producing more graduates than ever before, driving job creation and the city's growing knowledge economy.\n\nHe is nationally recognized for advancing top research universities through strategic government-university-industry collaborations, public-private partnerships and community engagement. These principles are at the heart of his conviction that UTSA is \"the university of the future in the city of the future.\"",
                imageUrl: "",
                linkedIn: "",
                order: 4,
                featured: false,
            },
            {
                name: "Dr. David Hilmers",
                title: "Professor",
                organization: "TRISH/Baylor College of Medicine",
                bio: "Dr. David C. Hilmers is a professor in the Departments of Internal Medicine, Pediatrics and in the Center for Space Medicine at the Baylor College of Medicine. He has served in a wide range of academic, research and clinical pursuits in these departments since joining the faculty in 1999.\n\nHis research interests have included infectious diseases such as malaria, hepatitis, HIV and Ebola, as well as refugee health, micronutrient deficiencies, and childhood malnutrition. He serves as the chief medical officer for Hepatitis B Free (HBF), an Australian-based NGO, dedicated to the prevention and treatment of hepatitis in low and middle-income countries.\n\nHe serves as a consultant on NASA-sponsored research projects to aid astronauts to perform medical procedures and react to medical emergencies that might arise during exploration missions using mixed reality and large language models. Prior to attending medical school, he retired as a Colonel after spending 20 years in the US Marine Corps as an aviator and electrical engineer and served as a NASA astronaut on four space shuttle missions, including the first after the Challenger accident. He was inducted into the United States Astronaut Hall of Fame in 2024.",
                imageUrl: "",
                linkedIn: "",
                order: 5,
                featured: true,
            },
            {
                name: "Gary Legault",
                title: "Senior Scientist",
                organization: "USAISR",
                bio: "",
                imageUrl: "",
                linkedIn: "",
                order: 6,
                featured: false,
            },
            {
                name: "The Honorable Gina Ortiz Jones",
                title: "Mayor of San Antonio",
                organization: "City of San Antonio",
                bio: "Mayor Gina Ortiz Jones was sworn into office as San Antonio's 69th Mayor on June 18, 2025. Jones, a first-generation American raised by a single mother in San Antonio, was taught early on about the importance of service by her family. She graduated from John Jay High School and earned a four-year Air Force ROTC scholarship that took her to Boston University.\n\nFollowing graduation, Jones earned her commission and served as an intelligence officer in the Air Force. A veteran of Operation Iraqi Freedom, Jones deployed to Camp Victory, Iraq to support close air support operations. Upon separating from the Air Force, she advised on military operations in Latin America and joined the Defense Intelligence Agency as an inaugural member of U.S. Africa Command in Stuttgart, Germany.\n\nIn 2021, President Biden nominated Jones and the U.S. Senate unanimously confirmed her to serve as the 27th Under Secretary of the Air Force, the second-highest civilian leading the Department of the Air Force. For her service, she earned the Department of Defense Medal for Distinguished Public Service, the department's highest civilian award.\n\nJones serves on the Iraq and Afghanistan Veterans of America Board of Directors, the Asian American Foundation Advisory Council and is a Life Member of the Council on Foreign Relations. Jones has advanced degrees from Boston University, the University of Kansas, and the U.S. Army School of Advanced Military Studies.",
                imageUrl: "",
                linkedIn: "",
                order: 7,
                featured: true,
            },
            {
                name: "Kim Reeves",
                title: "Co-Founder & CEO",
                organization: "Legacy Innovation Inc",
                bio: "Kim Reeves is a serial entrepreneur with proven commercial success in the vastly different industries of banking, architecture, and technology. Her signature MO includes \"disruption for new best practices\" and market philosophy \"have clients seek you.\"\n\nAs a bank VP on the east coast, she revolutionized Marketing IT & CRM. As an entrepreneur in Silicon Valley, she created and led a premier architectural & scientific glass company heralded for its original designs, craftsmanship, and service.\n\nKim is currently Co-Founder & CEO for Legacy US, an innovation company in Boise Idaho focused on technologies in pressure, temperature and flow. Legacy holds dozens of utility patents in the US and globally. Major clients have included Molson Coors, ITW, Apple, and Department of Defense / US Air Force. Current industries include beverage and stadiums with R&D in progress for indoor farming and a platform of medical devices designed for austere battlefield environments.",
                imageUrl: "",
                linkedIn: "",
                order: 8,
                featured: false,
            },
            {
                name: "LTC (Ret.) Jonathan D. Stallings",
                title: "Chief Data Scientist",
                organization: "Joint Trauma System",
                bio: "Jonathan D. Stallings, PhD is the Chief Data Scientist at the Joint Trauma System, where he leads efforts in data analysis and applying advanced statistical methods to improve trauma care. He is particularly interested in leveraging artificial intelligence (AI) for medical devices and navigating the regulatory approval process. He recently played a significant role in the FDA clearance of the DOD's first AI medical device.\n\nDr. Stallings retired from the U.S. Army as a Lieutenant Colonel, having served in various key roles that spanned 22 years of research, regulatory affairs, and operational medicine, which include deploying as a theater biochemist in the Middle East and a Fellowship at the FDA. Dr. Stallings continues to expand his expertise in biostatistics, applied statistics, data science, machine learning, and clinical trial analysis, with over 70 peer-reviewed publications.\n\nHe is recognized for his contributions with multiple military awards, including the Legion of Merit, Meritorious Service Medal (3rd Award), Army Commendation Medal (3rd Award), and the United Nations Medal. He was awarded the Brigadier General Michael A. Dunn \"Press-On Energy\" award and the Order of Military Medical Merit. He is married to Alexandra of Long Island, NY, and they reside in Converse, TX.",
                imageUrl: "",
                linkedIn: "",
                order: 9,
                featured: false,
            },
        ]

        for (const speaker of speakers) {
            const ref = db.collection("speakers").doc()
            batch.set(ref, {
                ...speaker,
                createdAt: FieldValue.serverTimestamp(),
                updatedAt: FieldValue.serverTimestamp(),
            })
        }

        await batch.commit()

        return NextResponse.json({
            success: true,
            message: `Successfully seeded ${speakers.length} speakers`,
            speakersAdded: speakers.length,
        })
    } catch (error) {
        console.error("[Admin API] Error seeding speakers:", error)
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Failed to seed speakers" },
            { status: 500 }
        )
    }
}
