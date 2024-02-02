"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import { getCandidateByNumber, getCurrentMaxDate, getLastCandidateNumber, toVote } from "@/services/Web3Service";
import { useRouter } from "next/navigation";

interface Candidate {
    number: Number;
    photoUri: string;
    name: string;
    votes: Number;
    date: Number;
};

export default function Vote() {
    const { push } = useRouter();

    const [currentMaxDate, setCurrentMaxDate] = useState(0);
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [showVotes, setShowVotes] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem("wallet")) return push("/");

        getCurrentMaxDate()
            .then(maxDate => setCurrentMaxDate(maxDate))
            .catch(err => console.error(err));


        getLastCandidateNumber()
            .then(async resLastCandidateNumber => {
                const promisesCandidates = [] as Promise<any>[];

                for (let i = 1; i < resLastCandidateNumber; ++i) {
                    promisesCandidates.push(getCandidateByNumber(i));
                }

                Promise.all(promisesCandidates)
                    .then(results => setCandidates(results));
            })
            .catch(err => console.error(err));

    }, []);

    async function voteCandidateNumber(candidateNumber: number) {
        toVote(candidateNumber)
            .then(() => {
                setShowVotes(true);
            })
            .catch(err => console.error(err));
    }

    return (
        <div className="flex flex-col items-center justify-center sm:h-screen">
            <main className="flex flex-col gap-12 p-12 justify-center">
                {
                    currentMaxDate > (Date.now() / 1000)
                        ? <p>Vote until {new Date(Number(currentMaxDate) * 1000).toString()}.</p>
                        : <p>Voting ended.</p>
                }
                <ul className="grid gap-4">
                    {candidates.map((candidate, number) => {
                        return (
                            <li key={number} className="flex gap-4">
                                <Image
                                    className="rounded border-2 border-orange-700"
                                    src={candidate.photoUri}
                                    alt={`${candidate.name} photo`}
                                    width={100}
                                    height={100}
                                />
                                <section className="flex flex-col items-start gap-4">
                                    <h2 className="font-bold text-xl">{candidate.name}, {String(candidate.number)}</h2>
                                    {
                                        showVotes
                                            ? (<p>{String(candidate.votes)} votes</p>)
                                            : (<button
                                                onClick={() => voteCandidateNumber(number)}
                                                className="bg-orange-700 rounded p-2 hover:scale-105 hover:font-bold flex gap-4 items-center text-white"
                                            >
                                                Click to vote
                                            </button>)
                                    }
                                </section>
                            </li>
                        );
                    })}
                </ul>
            </main>
            <footer className="flex flex-wrap-reverse justify-between p-12 gap-12 md:gap-40 text-gray-500">
                &copy; 2024 Web 3 Voting, Inc
                <nav className="flex gap-4">
                    <a className="italic" href="/">Home</a>
                    <a className="italic" href="/">About</a>
                </nav>
            </footer>
        </div>
    );
}
