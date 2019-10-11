export function isSpeechSynthesisSupported() {
    return typeof window !== undefined && window.speechSynthesis != null;
}

export function speak(word: string, lang = "en-US") {
    if (!isSpeechSynthesisSupported) {
        console.info("Speech synthesis is not available.");
        return;
    }

    const synth = window.speechSynthesis;

    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = lang;

    synth.speak(utterance);
}
