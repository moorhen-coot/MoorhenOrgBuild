
import { MoorhenContainer, MoorhenMolecule, addMolecule } from 'moorhen'
import { webGL } from 'moorhen/types/mgWebGL';
import { moorhen } from 'moorhen/types/moorhen';
import { useEffect, useRef } from 'react';
import { createBrowserRouter, RouterProvider, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export const MoorhenRouter: React.FC = () => {
    return <RouterProvider router={moorhenRouter} />
};

const MoorhenContainerWithPdb: React.FC = () => {
    const glRef = useRef<webGL.MGWebGL | null>(null)
    const commandCentre = useRef<moorhen.CommandCentre | null>(null)
    const dispatch = useDispatch()
    const cootInitialized = useSelector((state: moorhen.State) => state.generalStates.cootInitialized)
    const urlPrefix = ""

    const { pdbId } = useParams()

    const collectedProps = {
        glRef, commandCentre, urlPrefix
    }

    useEffect(() => {
        if (pdbId && cootInitialized) {
            const asyncFunc = async () => {
                const newMolecule: moorhen.Molecule = new MoorhenMolecule(commandCentre, glRef, "")
                const pdbCode: string = pdbId.toLowerCase()
                const coordUrl: string = `https://www.ebi.ac.uk/pdbe/entry-files/download/${pdbCode}.cif`
                await newMolecule.loadToCootFromURL(coordUrl, pdbCode)
                await newMolecule.addRepresentation("CRs", "/*/*")
                await newMolecule.fetchIfDirtyAndDraw("ligands")
                newMolecule.centreOn("/*/*")
                glRef.current?.setZoom(4.0)
                dispatch(addMolecule(newMolecule))
            }
            asyncFunc()
        }
    }, [pdbId, cootInitialized])
    return <MoorhenContainer {...collectedProps} />
}

const moorhenRouter = createBrowserRouter(
    [
        {
            path: "",
            element: <MoorhenContainer />,
        },
        {
            path: "/",
            element: <MoorhenContainer />,
        },
        {
            path: "/pdb/:pdbId",
            element: <MoorhenContainerWithPdb />,
        },
        {
            path: "/:pdbId",
            element: <MoorhenContainerWithPdb />,
        },
    ]
)

