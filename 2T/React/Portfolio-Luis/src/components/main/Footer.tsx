function Footer() {
  return (
    <footer className="relative border-t border-[#00c8ff]/20 bg-[#050d1a]/90 py-6 text-center">
      <p className="font-mono text-xs tracking-[3px] text-[#5a8fa8]">
        © {new Date().getFullYear()} —{" "}
        <span className="text-[#00c8ff]">Mi Portfolio - Luis </span>
      </p>
    </footer>
  )
}

export default Footer