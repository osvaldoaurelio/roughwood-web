const sleep = async (time = 200) => new Promise(_ => setTimeout(_, time));

export default sleep;
